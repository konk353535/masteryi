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
  async.eachLimit(res.rows, 10, (item, next) => {
    worker.bulkCheckUsers(parseInt(item.summoner_id), 1, item.region, function (err, res) {
      if (err) logger.error(err);
      next(null);
    });
  }, (err) => {
    if (err) return console.log(err);
    // Update champion specific rankings
    client.query('UPDATE mastery SET champion_rank=rank' +
      'FROM (SELECT *, RANK() OVER(PARTITION BY champion_id ORDER BY points DESC) AS rank FROM mastery) AS t1' +
      'WHERE mastery.user_id=t1.user_id AND mastery.champion_id=t1.champion_id' +
      'AND (t1.rank <= 200)', (err, res) => {
        if (err) return console.error(err);
      });
  });
})

