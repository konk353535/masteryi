const env = process.argv[2] || 'prod';
const config = require('./config')(env);
const logger = require('bunyan').createLogger({ name: 'updateTop ' });
const pg = require('pg');
const async = require('async');
const client = new pg.Client(config.database);
const worker = require('./worker');
const ranker = require('./ranker');
client.connect();

const queryText = 'SELECT user_id, summoner_id, region FROM mastery, users WHERE (champion_rank < 250 OR global_rank < 250) AND mastery.user_id = users.id';

client.query(queryText, function(err, res){
  if (err) return console.log(err);
  async.eachLimit(res.rows, 2, (item, next) => {
    worker.bulkCheckUsers(parseInt(item.summoner_id), 1, item.region, function (err, res) {
      if (err) logger.error(err);
      next(null);
    });
  }, (err) => {
    if (err) return console.log(err);
    console.log('Easy part is over, hard part begins');
    // Update champion specific rankings
    ranker.startChampion();
  });
})

