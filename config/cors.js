'use strict';
const config = require('./config');

module.exports = function cors(app) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', config.originURL);
    res.header('Access-Control-Allow-Headers',
               'Content-Type,Content-Length,X-Requested-With,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
};
