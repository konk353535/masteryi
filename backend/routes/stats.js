const env = process.argv[2] || 'prod';
const config = require('./../config')(env);
const logger = require('bunyan').createLogger({ name: 'statRoutes ' });
const pg = require('pg');
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
};
