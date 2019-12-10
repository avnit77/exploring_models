const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  hasPlayground: {
    type: Boolean,
    required: true
  },
  hasDogpark: {
    type: Boolean,
    required: true
  },
  quadrant: {
    type: String,
    enum: ['NE', 'SE', 'NW', 'SW'],
    required: true
  }
});

module.exports = mongoose.model('Park', schema);
