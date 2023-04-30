const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({

  name: {
    type: String, // 資料型別是字串
    required: false
  },
  email:{
    type: String, // 資料型別是字串
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('userData', userSchema)
