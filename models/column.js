const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let columnSchema = new Schema({
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
    collection: 'columns'
});

module.exports = mongoose.model('Column', columnSchema)