var env = process.argv[2] || 'prod';
var config = require('/backend/config')(env);

var express = require('express');
var app = express();
var morgan = require('morgan')

app.use(morgan('combined'));
// To serve static content, such as compiled ember app
app.use(express.static(__dirname + '/frontend/dist'));

require('./routes/scans')(app);
require('./routes/stats')(app);

// Point all non defined routes to our ember app
if (config.staticFiles) {
  app.get('*', function(req, res) {
    res.sendFile('/frontend/dist/index.html', { root: __dirname });
  });
}

app.listen(3025, function () {
  console.log('We have a go on 3025!');
});
