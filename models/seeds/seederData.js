const mongoose = require('mongoose')// 載入mongoose
const restaurantData = require('../restaurantData')// 載入model
const restaurantList = require('../../restaurant.json')// 載入種子資料
const db=require('../../config/mongoose')

const restaurant_list = restaurantList.results

db.once('open', () => {
  console.log('mongodb connected!')
  restaurant_list.forEach(restaurant => {
    restaurantData.create({

      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      rating: restaurant.rating,
      description: restaurant.description

    })
  })
  console.log('done')
})
