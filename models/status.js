const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let statusSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
}, {
    collection: 'statuses'
});

module.exports = mongoose.model('Status', statusSchema)