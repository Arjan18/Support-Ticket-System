const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ticketSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  info: {
    type: String,
    required: true,
  },
  allocated_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  raised_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column',
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
}, {
    collection: 'tickets'
});

module.exports = mongoose.model('Ticket', ticketSchema)