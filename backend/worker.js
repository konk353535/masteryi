// Core
const env = process.argv[2] || 'prod';
const config = require('./config')(env);
const async = require('async');
const request = require('requestretry');
// Utilities
const _ = require('lodash');
const logger = require('bunyan').createLogger({ name: 'worker' });
const util = require('./util');
// Database
const pg = require('pg');
const client = new pg.Client(config.database);
client.connect();

const startWorker = function (startID, endID, region, runNumber) {
  const scanArr = _.range(startID, endID, 39);
  const concurrency = config.workerConcurrency;

  async.eachLimit(scanArr, concurrency, (item, next) => {
    updateWorkerStatus(item, region, runNumber);
    bulkCheckUsers(item, 39, region, next);
  }, (err, res) => {
    if (err) logger.info(`Error: ${err}`);
    logger.info(`Success: ${res}`);
  });
};

// Check if user list exists
const bulkCheckUsers = function (startID, batchSize, region, next) {
  const userIDs = _.range(startID, startID + batchSize).join(',');

  const fetchUsersUrl = `https://${region}.api.pvp.net/api/lol/${region}/v1.4/summoner/${userIDs}?api_key=${config.key}`;

  // Randomize timeout to reduce number of parrallel requests;
  const timeout = parseInt(Math.random()*1000) + 1000;
  request({ url: fetchUsersUrl, retryDelay: 10000, timeout }, (err, response, body) => {
    if (response && response.statusCode === 404) return next();
    if (response && response.statusCode === 429) return setTimeout(() => bulkCheckUsers(startID, batchSize, region, next), 10000);

    if (err || !response || response.statusCode !== 200) {
      logger.error(`Unexpected error: ${err}`);
      return next();
    }

    var usersRaw = JSON.parse(body);
    var users = Object.keys(usersRaw).map((key) => {
      return usersRaw[key];
    });

    // Filter out low level summoners to increase scan speed, as low level summoners cannot have level 5 mastery anyway
    users = users.filter(user => user.summonerLevel > 10);

    if (users.length <= 0) return next();

    bulkScanUsers(users, region, next);
  });
};

// Scan user for champion mastery, if found load into database
const bulkScanUsers = function (users, region, callback) {
  const platformID = util.getPlatformID(region);
  const usersDetailed = [];

  const scanUser = (user, next) => {
    const fetchMasteryUrl = `https://${region}.api.pvp.net/championmastery/location/${platformID}/player/${user.id}/champions?api_key=${config.key}`;

    // Randomize timeout to reduce number of parrallel requests;
    const timeout = parseInt(Math.random()*1000) + 1000;
    request({ url: fetchMasteryUrl, retryDelay: 10000, timeout }, (err, response, body) => {
      if (response && response.statusCode === 404) return next();
      if (response && response.statusCode === 429) return setTimeout(() => scanUser(user, next), 10000);

      if (!response || err || response.statusCode !== 200) {
        logger.error(`Unexpected error: ${err}`);
        return next();
      } 

      // Array of users champion mastery
      var champions = JSON.parse(body)
      // Only want level 5's
      champions = champions.filter((champion) => champion.championLevel === 5)

      if (champions.length === 0) return next();

      user.champions = champions;
      usersDetailed.push(user);

      next();
    });
  }

  async.eachLimit(users, 20, scanUser, (err) => {
    logger.info(`(${region}) Went from ${users.length} -> ${usersDetailed.length}`);
    if (usersDetailed.length <= 0) return callback(null, null);
    uploadBulkUsers(usersDetailed, region, callback)
  });
}

// Upsert our user and mastery info
const uploadBulkUsers = function (usersDetailed, region, outerCallback) {

  const uploadUser = (user, next) => {
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
        champions = util.toSingleObject(user.champions, 'championId')
        
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
      next(null);
    });
  }

  async.eachLimit(usersDetailed, 10, uploadUser, (err) => {
    if (err) logger.error(err);
    outerCallback(null, null);
  });
  
}

const updateWorkerStatus = function (currentID, region, runNumber) {
  client.query('UPDATE scans SET current_id=($1) WHERE region=($2) AND run_number=($3)', [currentID, region, runNumber], (err, res) => {
    if (err) logger.error(err);
  });
}

module.exports = {
  start: startWorker,
  bulkCheckUsers
}
