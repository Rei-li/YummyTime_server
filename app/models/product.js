'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  vendor: { ref: 'Vendor', type: Schema.ObjectId }
});

module.exports = mongoose.model('Product', productSchema);
