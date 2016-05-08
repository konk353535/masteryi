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

  const fetchChampTotals = (callback) => {
    // Cache the max ranking for each champion + overall
    client.query('SELECT max(champion_rank) as champion_total, champion_id FROM mastery GROUP BY champion_id', (err, res) => {
      if (err || !res.rows) return callback(err);
      callback(null, res.rows);
    });
  };

  const fetchGlobalTotal = (champion_totals, callback) => {
    client.query('SELECT max(global_rank) as global_total FROM mastery', (err, res) => {
      if (err || !res.rows || res.rows.length === 0) return callback(err);
      const global_total = res.rows[0].global_total;
      callback(null, champion_totals, global_total)
    });
  };

  const fetchExisting = (champion_totals, global_total, callback) => {
    client.query('SELECT * FROM mastery_cache', (err, res) => {
      if (err) return callback(err);
      callback(null, champion_totals, global_total, res.rows);
    });
  };

  const upsertCache = (champion_totals, global_total, existing, callback) => {
    var existingMap = {};
    if (existing) {
      existing.forEach((row) => {
        existingMap[row.champion_id] = true;
      });
    }

    var queryText;

    async.eachLimit(champion_totals, 5, (item, next) => {
      if (existingMap[item.champion_id]) {
        // Update
        queryText = 'UPDATE mastery_cache SET champion_total=($1), global_total=($2) WHERE champion_id=($3)';
        client.query(queryText, [item.champion_total, global_total, item.champion_id], next);
      } else {
        // Insert
        queryText = 'INSERT INTO mastery_cache (champion_id, champion_total, global_total) VALUES (($1), ($2), ($3))';
        client.query(queryText, [item.champion_id, item.champion_total, global_total], next);
      }
    }, callback);
  }

  async.waterfall([

    fetchChampTotals,
    fetchGlobalTotal,
    fetchExisting,
    upsertCache

  ], (err) => {
    if (err) logger.error(err);
    logger.info('Updated champion mastery cache');
  });

}

module.exports = {
  start: startRanking,
  cacheMax: cacheMax
}
