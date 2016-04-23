// General
const env = process.argv[2] || 'prod';
const config = require('./config')(env);
const logger = require('bunyan').createLogger({ name: 'worker' });
// Database
const pg = require('pg');
const client = new pg.Client(config.database);
client.connect();
// Worker
const worker = require('./worker');

logger.info('Searching for existing scans...');

client.query('SELECT * FROM scans', (err, result) => {
  if (err) return logger.error('Error finding existing scans...');

  // Iterate over found scans
  result.rows.forEach((scan) => {
    logger.info(`Starting worker for ${scan.region}, scan range is ${scan.current_id} - ${scan.end_id}. Run #${scan.run_number}`);
    worker.start(scan.current_id, scan.end_id, scan.region, scan.run_number);
  });
});
