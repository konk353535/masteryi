var env = process.argv[2] || 'prod';
var config = require('./../config')(env);
var logger = require('bunyan').createLogger({ name: "scanRoutes "});
var pg = require('pg');
pg.defaults.parseInt8 = true
var client = new pg.Client(config.database);
client.connect();

module.exports = function (app) {
  app.get('/api/scans', (req, res) => {
    client.query('SELECT * FROM scans', (err, result) => {
      if (err) return res.status(500).send('Sorry another problem :(');
      res.send(result.rows);
    });
  });
}
