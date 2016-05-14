// General
const env = process.argv[2] || 'prod';
const request = require('requestretry');
const config = require('./config')(env);
const async = require('async');
const _ = require('lodash');
const logger = require('bunyan').createLogger({ name: 'Region Max Finder' });
// Postgres
var pg = require('pg');
pg.defaults.parseInt8 = true
var client = new pg.Client(config.database);
client.connect();

const BILLION = 1000000000;
const MILLION = 1000000;

const search = (region, minID, maxID, searchWidth, callback) => {
  var userIDs = _.range(minID, maxID, searchWidth);
  var maxFoundID = -Infinity;

  async.eachLimit(userIDs, 5, (userID, next) => {
    const userIDs = _.range(userID - 20, userID + 20);
    const fetchUserUrl = `https://${region}.api.pvp.net/api/lol/${region}/v1.4/summoner/${userIDs}?api_key=${config.key}`;
    request({ url: fetchUserUrl }, (err, response, body) => {
      if (body) {
        var usersRaw = JSON.parse(body);
        var users = Object.keys(usersRaw).map((key) => {
          return usersRaw[key];
        });
        users.map((user) => {
          if (user.id > maxFoundID) maxFoundID = user.id;
        });
      }

      next();
    });
  }, (err) => {
    if (err) logger.error(err);
    if (searchWidth === 1){
      logger.info(`Scanner completed for ${region} max id is ${maxFoundID}`);
      callback(null, maxFoundID);
    } else {
      if (maxFoundID === -Infinity) maxFoundID = 0;
      logger.info(`Scanner found ${maxFoundID} for search width ${searchWidth}`);
      search(region, maxFoundID, (maxFoundID + (searchWidth * 2)), searchWidth / 10, callback);
    }
  });
}

const startFinder = () => {
  // Get all scans
  client.query('SELECT * FROM scans', (err, results) => {
    if (err) logger.error(err);

    if (results && results.rows && results.rows.length > 0) {
      const scans = results.rows;
      async.eachLimit(scans, 1, (item, next) => {
        search(item.region, 0, BILLION, BILLION, (err, res) => {
          if (!err && res) client.query('UPDATE scans SET end_id = ($1) WHERE region = ($2)', [res, item.region]);
          next();
        });
      });
    }
  });
}

module.exports = {
  start: startFinder
}

