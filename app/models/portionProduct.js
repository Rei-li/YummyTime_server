'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portionProductSchema = new Schema({
  quantity: { type: Number, required: true },
  product: { ref: 'Product', type: Schema.ObjectId }
});

module.exports = mongoose.model('PortionProduct', portionProductSchema);
