module.exports = function (env) {
  if (env === 'prod') {
    return {
      workerConcurrency: 1,
      key: '<riot-api-key>',
      database: 'postgres://username:password@localhost/database'
    };
  } else {
    return {
      workerConcurrency: 1,
      key: '<riot-api-key>',
      database: 'postgres://username:password@localhost/database'
    };
  }
}
