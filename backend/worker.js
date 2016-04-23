// Core
const env = process.argv[2] || 'prod';
const config = require('./config')(env);
const async = require('async');
const request = require('request');
// Utilities
const _ = require('lodash');
const logger = require('bunyan').createLogger({ name: 'worker' });
const util = require('./util');
// Database
const pg = require('pg');
const client = new pg.Client(config.database);
client.connect();

// Check if a user exists
const checkUser = function (userID, region, next) {
  const fetchUserUrl = `https://${region}.api.pvp.net/api/lol/${region}/v1.4/summoner/${userID}?api_key=${config.key}`;

  request(fetchUserUrl, { timeout: 2500 }, (err, response, body) => {
    if (response && response.statusCode === 404) return next();
    if (response && response.statusCode === 429) return setTimeout(() => checkUser(userID, region, next), 10000);

    if (err || !response || response.statusCode !== 200) {
      logger.error(`Unexpected error: ${err}`);
      return next();
    }

    logger.info(`Found User ${body}`);
    scanUser(JSON.parse(body), region, next);
  });
};

// Scan user for champion mastery, if found load into database
const scanUser = function (userRaw, region, callback) {
  const platformID = util.getPlatformID(region);

  for (const key in userRaw) {
    if (userRaw.hasOwnProperty(key)) {
      const user = userRaw[key];
    }
  }

  const fetchMasteryUrl = `https://${region}.api.pvp.net/championmastery/location/${platformID}/player/${user.id}/champions?api_key=${config.key}`;

  request(fetchMasteryUrl, { timeout: 2500 }, (err, response, body) => {
    if (response && response.statusCode === 404) return callback();
    if (response && response.statusCode === 429) return setTimeout(() => scanUser(userRaw, region, callback), 10000);

    if (!response || err || response.statusCode !== 200) {
      logger.error(`Unexpected error: ${err}`);
      return callback();
    } 

    // Array of users champion mastery
    const champions = JSON.parse(body)
    // Only want level 5's
    champions = champions.filter((champion) => champion.championLevel === 5)

    if (champions.length === 0) return callback();

    uploadUser(user, champions, region, callback)
  });
}

// Upsert our user and mastery info
const uploadUser = function (user, champions, region, outerCallback) {

  async.waterfall([
    // Check for existing user
    function (callback) {
      client.query('SELECT id, name, summoner_id, region FROM users WHERE summoner_id=($1) AND region=($2)', [user.id, region], function (err, res) {
        if (err || !res) logger.error(`Unexpected error searching for existing user: ${err}`)
        if (res.rowCount === 0) return callback(null, null)

        callback(null, res.rows[0]);
      });
    },

    // Create / Update user
    function (dbUser, callback) {
      if (dbUser) {
        client.query('UPDATE users SET name=$1 WHERE summoner_id=$2 AND region=$3 RETURNING id', [user.name, user.id, region], callback);
      } else {
        client.query('INSERT INTO users (summoner_id, region, name) VALUES ($1, $2, $3) RETURNING id', [user.id, region, user.name], callback);
      }
    },

    // Check for existing mastery
    function (result, callback) {
      const userID = result.rows[0].id;
      client.query('SELECT * FROM mastery WHERE user_id=($1)', [userID], function(err, res){
        callback(err, res, userID);
      })
    },

    // Insert / Update mastery
    function (result, userID, callback) {

      const existingChampions = util.toSingleObject(result.rows, 'champion_id');
      champions = util.toSingleObject(champions, 'championId')
      
      async.eachLimit(champions, 10, (champion, next) => {

        if (existingChampions && existingChampions[champion.championId]){
          // Existing
          const updateArr = [champion.championPoints, champion.championId, userID]
          client.query('UPDATE mastery SET points=($1) WHERE champion_id=($2) AND user_id=($3)', updateArr, (err, res) => {
            if (err) logger.error(err)
            next(null, res)
          })
        } else {
          // New
          const insertArr = [userID, champion.championId, champion.championPoints]
          client.query('INSERT INTO mastery (user_id, champion_id, points) VALUES ($1, $2, $3)', insertArr, (err, res) => {
            if (err) logger.error(err)
            next(null, res)
          })
        }

      }, callback)
    }
  ], function (err, res) {
    if (err) logger.error(err);
    outerCallback (null, res)
  });
}

const updateWorkerStatus = function (currentID, region, runNumber) {
  client.query('UPDATE scans SET current_id=($1) WHERE region=($2) AND run_number=($3)', [currentID, region, runNumber], (err, res) => {
    if (err) logger.error(err);
  });
}

const startWorker = function (startID, endID, region, runNumber) {
  const scanArr = _.range(startID, endID);
  const concurrency = config.workerConcurrency;

  async.eachLimit(scanArr, concurrency, (item, next) => {
    updateWorkerStatus(item, region, runNumber);
    checkUser(item, region, next);
  }, (err, res) => {
    if (err) logger.info(`Error: ${err}`);
    logger.info(`Success: ${res}`);
  });
};


module.exports = {
  start: startWorker
}
