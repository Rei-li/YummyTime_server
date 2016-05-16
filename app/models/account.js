'use strict';

const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const OAuthProviders = [
  'google'
];
const accountSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  hashed_password: { type: String, default: '' },
  provider: { type: String, default: '' },
  google: {
    id: { type: String },
    token: { type: String },
    refreshToken: { type: String },
    displayName: { type: String }
  }
});

accountSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

accountSchema.path('email').validate(function(email, callback) {
  const Account = mongoose.model('Account');

  if (this.requireValidation()) {
    if (this.isNew || this.isModified('email')) {
      Account.find({ email })
        .exec((err, accounts) => callback(!err && accounts.length === 0));
    }
  } else {
    callback(true);
  }
}, 'Email already exists');

accountSchema.methods = {

  /**
   * Create an unique salt sequence
   *
   * @return {Number}
   * @api public
   */
  makeSalt() {
    return bcrypt.genSaltSync(8);
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword(password) {
    return bcrypt.hashSync(password, this.makeSalt());
  },

  /**
   * Ensure the password is valid
   *
   * @param {String} password
   * @return {Boolean}
   * @api public
   */
  authenticate(password) {
    return bcrypt.compareSync(password, this.hashed_password);
  },

  /**
   * Uses to skip validation if account uses OAuth
   *
   * @return {Boolean}
   * @api public
   */
  requireValidation() {
    return (OAuthProviders.indexOf(this.provider) === -1);
  }
};

accountSchema.statics = {

  /**
   * Load instance
   *
   * @param {Object} options
   * @param {Function} callback
   * @api private
   */
  load(options, callback) {
    const select = options.select || 'name';
    return this.findOne(options.criteria)
      .select(select)
      .exec(callback);
  }
};

module.exports = mongoose.model('Account', accountSchema);
