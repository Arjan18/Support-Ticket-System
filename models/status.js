const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let statusSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, {
    collection: 'statuses'
});

module.exports = mongoose.model('Status', statusSchema)