const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let departmentSchema = new Schema({
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
    collection: 'departments'
});

module.exports = mongoose.model('Department', departmentSchema)