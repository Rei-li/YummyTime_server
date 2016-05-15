'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItem = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  comment: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  paid: {
    type: Boolean,
    required: true
  }
});

module.exports = orderItem;
