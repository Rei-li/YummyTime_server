'use strict';

const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  email: { type: String, required: true },
  hashed_password: { type: String, required: true },
  name: { type: String, default: '' },
  phone: { type: String, default: '' }
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

  if (this.isNew || this.isModified('email')) {
    Account.find({ email })
      .exec((err, accounts) => callback(!err && accounts.length === 0));
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
