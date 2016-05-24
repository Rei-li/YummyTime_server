'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portionProductSchema = new Schema({
  quantity: { type: Number, required: true },
  product: { ref: 'Product', type: Schema.ObjectId },
  deleted: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model('PortionProduct', portionProductSchema);
