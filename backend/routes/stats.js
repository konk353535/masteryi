const env = process.argv[2] || 'prod';
const config = require('./../config')(env);
const logger = require('bunyan').createLogger({ name: 'statRoutes '});
const pg = require('pg');
pg.defaults.parseInt8 = true;
const client = new pg.Client(config.database);
client.connect();

module.exports = function (app) {
  app.get('/api/totals', (req, res) => {
    client.query('SELECT count(id), region FROM users GROUP BY region', (err, result) => {
      if (err) return res.status(500).send('Sorry another problem :(');
      res.send(result.rows);
    });
  });

  app.get('/api/summary', (req, res) => {
    const queryText = 'SELECT * FROM mastery, users WHERE mastery.points IN ' +
      '(select max(points) FROM mastery GROUP BY champion_id) AND users.id = mastery.user_id';
    client.query(queryText, (err, result) => {
      if (err) {
        logger.error(err);
        return res.status(500).send('Uhh woops, that\'s a problem');
      }

      res.send(result);
    });
  });
};
