var env = process.argv[2] || 'prod';
var config = require('./../config')(env);
var logger = require('bunyan').createLogger({ name: "statRoutes "});
var pg = require('pg');
pg.defaults.parseInt8 = true;
var client = new pg.Client(config.database);
client.connect();

module.exports = function (app) {
  app.get('/api/totals', (req, res) => {
    client.query('SELECT count(id), region FROM users GROUP BY region', (err, result) => {
      if (err) return res.status(500).send('Sorry another problem :(');
      res.send(result.rows);
    });
  });
}
