var env = process.argv[2] || 'prod';
var config = require('./config')(env);

var express = require('express');
var app = express();
var morgan = require('morgan');

var ranker = require('./ranker');
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

app.listen(80, function () {
  console.log('We have a go on 80!');
});

new CronJob('0 0 0 */4 * *', function () {
  ranker.start();
}, null, true);

ranker.cacheMax();
new CronJob('0 */5 * * * *', function () {
  ranker.cacheMax();
}, null, true);
