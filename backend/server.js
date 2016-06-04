var env = process.argv[2] || 'prod';
var config = require('./config')(env);

var express = require('express');
var app = express();
var morgan = require('morgan');

var ranker = require('./ranker');
var scanRangeFinder = require('./scanRangeFinder');
var CronJob = require('cron').CronJob;

app.use(morgan('combined'));
// To serve static content, such as compiled ember app
app.use(express.static(__dirname + '/dist'));

require('./routes/scans')(app);
require('./routes/stats')(app);

// Point all non defined routes to our ember app
if (config.staticFiles) {
  app.get('*', function(req, res) {
    res.sendFile('/dist/index.html', { root: __dirname });
  });
}

if (env === 'prod'){
  app.listen(80, function () {
    console.log('We have a go on 80!');
  });
} else {
  app.listen(3025, function () {
    console.log('We have a go on 3025!');
  });
}

new CronJob('0 0 0 */5 * *', function () {
  ranker.startGlobal();
}, null, true);

new CronJob('0 0 0 */3 * *', function () {
  ranker.startChampion();
}, null, true);

new CronJob('0 0 1 * * *', function () {
  ranker.cacheMax();
}, null, true);

new CronJob('0 0 2 * * *', function () {
  scanRangeFinder.start();
}, null, true);
