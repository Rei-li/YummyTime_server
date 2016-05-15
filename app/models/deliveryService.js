'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliveryServiceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  minOrderAmount: {
    type: String,
    required: false
  },
  workingTime: {
    type: [Number],
    required: true
  }
});

module.exports = mongoose.model('deliveryService', deliveryServiceSchema);
