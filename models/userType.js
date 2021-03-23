const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserTypeSchema = new Schema({
  type: {
    type: String,
    required: true,
    unique: true,
  },
}, {
    collection: 'userTypes'
});

module.exports = mongoose.model('UserType', UserTypeSchema)