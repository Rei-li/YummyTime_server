'use strict';

const development = require('./env/development');
const production = require('./env/production');

/**
 * Expose
 */

module.exports = {
  development,
  production
}[process.env.NODE_ENV || 'development'];
