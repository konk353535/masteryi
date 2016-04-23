module.exports = function (env) {
  if (env === 'prod') {
    return {
      workerConcurrency: 1,
      key: '<riot-api-key>',
      database: '<connect-string-postgres'
    };
  } else {
    return {
      workerConcurrency: 1,
      key: '<riot-api-key>',
      database: '<connect-string-postgres'
    };
  }
}
