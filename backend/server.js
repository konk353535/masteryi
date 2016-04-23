var express = require('express');
var app = express();
var morgan = require('morgan')

app.use(morgan('combined'));
// To serve static content, such as compiled ember app
app.use(express.static(__dirname + '/dist'));

require('./routes/scans')(app);
require('./routes/stats')(app);

app.listen(3025, function () {
  console.log('We have a go on 3025!');
});