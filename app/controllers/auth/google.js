'use strict';

const jwt = require('jsonwebtoken');
const google = require('googleapis');
const plus = google.plus('v1');
const OAuth2 = google.auth.OAuth2;

const Account = require('../../models/account');
const config = require('../../../config/config');

const oauth2Client = new OAuth2(config.google.clientID,
                                config.google.clientSecret,
                                config.google.callbackURL);

function createAccessToken(account) {
  return {
    message: 'Enjoy your token',
    token: jwt.sign(account.id, config.secret)
  };
}

function loadOrCreateAccount(token, refreshToken, profile, done) {
  const options = {
    criteria: { 'google.id': profile.id }
  };

  Account.load(options, (err, account) => {
    if (err) return done(err);

    if (!account) {
      // eslint-disable-next-line no-param-reassign
      account = new Account({
        name: profile.displayName,
        provider: 'google',
        google: {
          token,
          refreshToken,
          id: profile.id,
          displayName: profile.displayName
        }
      });

      // eslint-disable-next-line no-shadow
      account.save((err) => {
        if (err) {
          throw err;
        }
      });
    }

    return done(err, account);
  });
}

exports.callback = function(req, res) {
  oauth2Client.getToken(req.body.code, (err, tokens) => {
    if (!err) {
      oauth2Client.setCredentials(tokens);

      // eslint-disable-next-line no-shadow
      plus.people.get({ userId: 'me', auth: oauth2Client }, (err, payload) => {
        if (err) {
          res.json(err);
        } else {
          loadOrCreateAccount(tokens.access_token, tokens.refresh_token,
                              // eslint-disable-next-line no-shadow
                              payload, (err, account) => {
                                if (account) {
                                  res.json(createAccessToken(account));
                                }
                              });
        }
      });
    } else {
      res.json(err);
    }
  });
};
