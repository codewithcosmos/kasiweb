const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  name: String,
  email: String,
  service: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quote', quoteSchema);
