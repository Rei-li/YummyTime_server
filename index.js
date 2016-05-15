'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const config = require('./config/config');
const app = express();

function connect(options) {
  return mongoose.connect(config.db, options).connection;
}

function listen() {
  app.listen(config.port);

  // eslint-disable-next-line no-console
  console.log(`Express app started on http://127.0.0.1:${config.port}`);
}

connect()
  // eslint-disable-next-line no-console
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

/**
 * Expose application
 */

module.exports = app;

// Configure application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./config/passport')(app, passport);

// Bootstrap routes
require('./config/routes')(app);
