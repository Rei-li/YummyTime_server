'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portionSchema = new Schema({
  text: { type: String, required: true },
  cost: { type: Number, required: true },
  paid: { type: Boolean, required: true, default: false },
  deleted: { type: Boolean, required: true, default: false },
  owner: { ref: 'Account', type: Schema.ObjectId },
  order: { ref: 'Order', type: Schema.ObjectId }
});

module.exports = mongoose.model('Portion', portionSchema);
