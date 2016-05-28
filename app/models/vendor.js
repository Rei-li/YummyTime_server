'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  'min-order-cost': { type: Number },
  description: { type: String, required: false }
});

vendorSchema.path('title').validate(function(title, callback) {
  const Vendor = mongoose.model('Vendor');

  if (this.isNew || this.isModified('title')) {
    Vendor.find({ title }).exec((err, vendors) =>
      callback(!err && vendors.length === 0)
    );
  } else {
    callback(true);
  }
}, 'Food vendor already exists');

module.exports = mongoose.model('Vendor', vendorSchema);
