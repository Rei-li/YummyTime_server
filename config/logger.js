'use strict';

const morgan = require('morgan');

module.exports = function configureLogger(app) {
  if (app.get('env') === 'development') {
    app.use(morgan('dev'));
  }
};
