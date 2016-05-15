'use strict';

const passport = require('passport');
const main = require('../app/controllers/main');
const api = require('../app/controllers/api');
const auth = require('../app/controllers/auth');

/**
 * Expose routes
 */

module.exports = function applyRoutes(app) {
  app.get('/', main.index);
  app.post('/auth/token', auth.token);
  app.get('/:type(orders|accounts|portions|vendors)', passport.authenticate('jwt'), api);
  app.get('/:type(orders|accounts|portions|vendors)/:id', passport.authenticate('jwt'), api);
  app.patch('/:type(orders)/:id', passport.authenticate('jwt'), api);
  app.post('/:type(orders|portions|vendors)', passport.authenticate('jwt'), api);
  app.post('/:type(accounts)', api);
};
