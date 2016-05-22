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
  app.post('/auth/google-oauth2', auth.google.callback);

  app.get('/:type(orders|accounts|portions|vendors|products|portion-products)',
   passport.authenticate('jwt'), api);
  app.get('/:type(orders|accounts|portions|vendors|products|portion-products)/:id',
    passport.authenticate('jwt'), api);
  app.patch('/:type(orders|portions|products|portion-products)/:id',
   passport.authenticate('jwt'), api);
  app.post('/:type(orders|portions|vendors|products|portion-products)',
   passport.authenticate('jwt'), api);
  app.post('/:type(accounts)', api);
  app.patch('/:type(accounts)/:id', passport.authenticate('jwt'), api);

  app.get('/:type(companies)', api);
  app.get('/:type(companies)/:id', api);
  app.post('/:type(companies)', api);
};
