const env = process.argv[2] || 'prod';
const config = require('./../config')(env);
const logger = require('bunyan').createLogger({ name: 'statRoutes ' });
const request = require('request');
const async = require('async');
const pg = require('pg');
const _ = require('lodash');
pg.defaults.parseInt8 = true;
const client = new pg.Client(config.database);
client.connect();

module.exports = function (app) {
  app.get('/api/summary', (req, res) => {
    var limit = req.query.limit;

    if (!limit) {
      limit = 'ALL';
    }

    var queryText = 'SELECT * FROM mastery, users WHERE mastery.points IN ' +
      '(select max(points) as points FROM mastery GROUP BY champion_id ORDER BY points desc LIMIT ($1))' +
      'AND users.id = mastery.user_id';
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
    var queryText = `SELECT rankings.*, users.* FROM
      (SELECT points, user_id, champion_id, rank() over (order by points desc) as rank 
      FROM mastery WHERE champion_id=($1) LIMIT 100) as rankings,
      users WHERE users.id = rankings.user_id;`;

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
        var userId = userObj.id;

        return callback(null, userId);
      });
    };

    // Get global rankings
    var rankUserGlobal = (userId, callback) => {
      var queryText = `SELECT ranked.*, total.* FROM (
        SELECT user_id, champion_id, rank() over (order by points desc) as overall_rank
        FROM mastery) as ranked,
        (SELECT max(points) as max_overall_points, count(*) as max_overall_rank from mastery) as total
        WHERE user_id = (SELECT id FROM users WHERE users.summoner_id = ($1) AND users.region = ($2))`;
      client.query(queryText, [userId, region], (err, result) => {
        if (err) {
          logger.error(err);
          return callback(err);
        }

        callback(null, result.rows);
      });
    };

    var rankChampions = (ranks, callback) => {
      if (ranks.length === 0) return callback(null, 'No rankings found');

      var player_rankings = [];

      // For each champion found, get champion specific rankings
      async.eachLimit(ranks, 1, (rank, next) => {
        var queryText = `SELECT ranked.*, total.* FROM (
          SELECT user_id, points, champion_id, rank() over (order by points desc) as champion_rank
          FROM mastery
          WHERE champion_id = ($1)) as ranked,
          (SELECT max(points) as max_champion_points, count(*) as max_champion_rank from mastery WHERE champion_id = ($1)) as total
          WHERE user_id = ($2)`;
        client.query(queryText, [rank.champion_id, rank.user_id], (err, res) => {
          if (err) {
            logger.error(err);
            return next(err);
          }

          // Merge champion specific ranks with global rankings
          var fullRanking = _.merge(res.rows[0], rank);
          player_rankings.push(fullRanking);
          return next(null);
        })
      }, (err) => {
        if (err) {
          logger.error(err);
          return callback(err);
        }

        callback(null, player_rankings);
      });
    };

    async.waterfall([
      findUser,
      rankUserGlobal,
      rankChampions
    ], (err, rankings) => {
      res.send(rankings);
    })

  });
};
