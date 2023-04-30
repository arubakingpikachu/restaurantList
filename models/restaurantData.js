const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({

  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  name_en: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {  // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    required: true
  }

})

module.exports = mongoose.model('restaurantData', restaurantSchema)
