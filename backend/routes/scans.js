var env = process.argv[2] || 'prod';
var config = require('./../config')(env);
var logger = require('bunyan').createLogger({ name: "scanRoutes "});
var pg = require('pg');
pg.defaults.parseInt8 = true
var client = new pg.Client(config.database);
client.connect();

module.exports = function (app) {
  app.get('/api/scans', (req, res) => {
    client.query('SELECT t.players, scans.* FROM ' +
      'scans, (SELECT count(id) as players, region FROM users GROUP BY region) t ' +
      'WHERE scans.region = t.region', (err, result) => {
      if (err) return res.status(500).send('Sorry another problem :(');
      res.send(result.rows);
    });
  });
}
