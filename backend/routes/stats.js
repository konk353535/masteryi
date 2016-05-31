const env = process.argv[2] || 'prod';
const config = require('./../config')(env);
const logger = require('bunyan').createLogger({ name: 'statRoutes ' });
const request = require('request');
const async = require('async');
const pg = require('pg');
const _ = require('lodash');
pg.defaults.parseInt8 = true;
const client = new pg.Client(config.database);
const worker = require('./../worker');
client.connect();

module.exports = function (app) {
  app.get('/api/summary', (req, res) => {
    var limit = req.query.limit;

    if (!limit) {
      limit = 'ALL';
    }

    var queryText = 'SELECT * FROM users, ' +
      '(SELECT * FROM mastery WHERE champion_rank = 1 ORDER BY global_rank ASC LIMIT ($1)) as ranks ' +
      'WHERE users.id = ranks.user_id';

    client.query(queryText, [req.query.limit], (err, result) => {
      if (err) {
        logger.error(err);
        return res.status(500).send('Uhh woops, that\'s a problem');
      }

      res.send(result);
    });
  });

  app.get('/api/summary/:champion', (req, res) => {
    var champion = req.params.champion;
    var queryText = 'SELECT * FROM users, ' +
      '(SELECT * FROM mastery WHERE champion_id = ($1) AND champion_rank <= 100) as ranks ' +
      'WHERE users.id = ranks.user_id';

    client.query(queryText, [champion], (err, result) => {
      if (err) {
        logger.error(err);
        return res.status(500).send('Uhh woops, that\'s a problem');
      }

      res.send(result);
    });
  });

  app.get('/api/search/:region/:name', (req, res) => {
    var region = req.params.region;
    var name = req.params.name;

    // Find the user
    var findUser = (callback) => {
      var findUserUrl = `https://${region}.api.pvp.net/api/lol/${region}/v1.4/summoner/by-name/${name}?api_key=${config.key}`;
      request(findUserUrl, { timeout: 2500 }, (err, response, body) => {
        if (err) {
          logger.error(err);
          return callback(err);
        }

        var userObj = JSON.parse(body)[name];
        if (userObj) {
          var userId = userObj.id;          
        } else {
          return callback(null, []);
        }

        return callback(null, userId);
      });
    };

    // Update the users data
    var updateUser = (userId, callback) => {
      worker.bulkCheckUsers(userId, 1, region, (err, res) => {
        if (err) logger.error(err);
        callback(null, userId);
      });
    };

    // Get users champion rankings
    var rankUser = (userId, callback) => {
      var queryText = 'SELECT * FROM users, mastery_cache, ' +
        '(SELECT * FROM mastery WHERE user_id = ' +
        ' (SELECT id FROM users WHERE users.summoner_id = ($1) AND users.region = ($2))' +
        ') as ranks WHERE users.id = ranks.user_id AND ranks.champion_id = mastery_cache.champion_id ' +
        'ORDER BY ranks.points DESC';

      client.query(queryText, [userId, region], (err, result) => {
        if (err) {
          logger.error(err);
          return callback(err);
        }

        callback(null, result.rows);
      });
    };

    async.waterfall([
      findUser,
      updateUser,
      rankUser
    ], (err, rankings) => {
      if (rankings && rankings.length === 0) return res.status(404).send();
      res.send(rankings);
    });

  });
};
