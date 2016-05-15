'use strict';

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Account = require('../../app/models/account');
const config = require('../config');

module.exports = new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret
},
(payload, done) => {
  const options = {
    criteria: { _id: payload }
  };

  // eslint-disable-next-line consistent-return
  Account.load(options, (err, account) => {
    if (err) {
      return done(err);
    }

    if (account) {
      done(null, account);
    } else {
      done(null, false);
    }
  });
});
