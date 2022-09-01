const mongoose = require('mongoose')

const PlayersSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  wins:{
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Players', PlayersSchema, 'scoreboard')