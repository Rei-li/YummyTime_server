'use strict';

const jwt = require('jsonwebtoken');
const Account = require('../models/account');
const config = require('../../config/config');

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
        const token = jwt.sign(account.id, config.secret);
        res.json({ message: 'Enjoy your token', token });
      } else {
        res.status(400).json({ message: 'Invalid password' });
      }
    } else {
      res.status(400).json({ message: 'No such account' });
    }
  });
};
