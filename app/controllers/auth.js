'use strict';

const jwt = require('jsonwebtoken');

const Account = require('../models/account');
const google = require('./auth/google');
const config = require('../../config/config');

function createAccessToken(account) {
  return {
    message: 'Enjoy your token',
    token: jwt.sign(account.id, config.secret)
  };
}

exports.token = function(req, res) {
  const options = {
    select: 'name email hashed_password',
    criteria: { email: req.body.email }
  };

  Account.load(options, (err, account) => {
    if (err) {
      throw err;
    }

    if (account) {
      if (account.authenticate(req.body.password)) {
        res.json(createAccessToken(account));
      } else {
        res.status(400).json({ message: 'Invalid password' });
      }
    } else {
      res.status(400).json({ message: 'No such account' });
    }
  });
};

exports.callback = function(req, res) {
  res.json(createAccessToken(req.user));
};

exports.google = google;
