const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserTypeSchema = new Schema({
  type: {
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
    collection: 'userTypes'
});

module.exports = mongoose.model('UserType', UserTypeSchema)