// General
const env = process.argv[2] || 'prod';
const config = require('./config')(env);
const async = require('async');
const logger = require('bunyan').createLogger({ name: 'worker' });
// Database
const pg = require('pg');
const client = new pg.Client(config.database);
client.connect();

const startRanking = function () {
  // Set global rankings for all players
  client.query(`UPDATE mastery SET global_rank=rank FROM 
    (SELECT row_number() OVER(ORDER BY points DESC) AS rank, * FROM mastery ORDER BY points DESC) AS t1 
    WHERE mastery.user_id=t1.user_id AND mastery.champion_id=t1.champion_id`, (err, res) => {
      if (err) {
        logger.error(err);
      } else {
        logger.info(res);
      }
      // Set champion rankings for all players
      client.query(`UPDATE mastery SET champion_rank=rank FROM 
        (SELECT *, RANK() OVER(PARTITION BY champion_id ORDER BY points DESC) AS rank FROM mastery) AS t1 
        WHERE mastery.user_id=t1.user_id AND mastery.champion_id=t1.champion_id`, (err, res) => {
          if (err) {
            logger.error(err);
          } else {
            logger.info(res);
          }
        }
      )
    }
  );
}

const cacheMax = function () {
  // Cache the max ranking for each champion + overall
  client.query('SELECT max(champion_rank) as champion_total, champion_id FROM mastery GROUP BY champion_id', (err, res) => {
    if (err || !res.rows) return logger.error(err);
    const champion_rows = res.rows;

    client.query('SELECT max(global_rank) as global_total FROM mastery', (err, res) => {
      if (err || !res.rows || res.rows.length === 0) return logger.error(err);

      const global_total = res.rows[0].global_total;

      async.eachLimit(champion_rows, 5, (item, next) => {
        const queryText = 'INSERT INTO mastery_cache (champion_id, champion_total, global_total) ' +
          'VALUES (($1), ($2), ($3)) ON CONFLICT(champion_id) ' +
          'DO UPDATE SET champion_total = ($2), global_total = ($3)';

        client.query(queryText, [item.champion_id, item.champion_total, global_total], (err, res) => {
          next();
        });
      }, (err) => {
        if (err) return logger.error(err);
        console.log('Finished updating totals');
      });
    });
  });
}

module.exports = {
  start: startRanking,
  cacheMax: cacheMax
}
