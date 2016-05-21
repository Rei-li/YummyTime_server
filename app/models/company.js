'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  title: { type: String, required: true },
  address: { type: String },
  description: { type: String }
});

companySchema.path('title').validate(function(title, callback) {
  const Company = mongoose.model('Company');

  if (this.isNew || this.isModified('title')) {
    Company.find({ title }).exec((err, companies) =>
      callback(!err && companies.length === 0)
    );
  } else {
    callback(true);
  }
}, 'Company already exists');

module.exports = mongoose.model('Company', companySchema);
