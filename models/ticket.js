const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: String,
  tickets: { type: [ { ticket: { user: String, case_id: Number } } ] },
  prefix: { type: String },
  ticketMod: String,
  ticketChannel: String,
  ticketCategory: String
})

module.exports = mongoose.model('tickets', schema)