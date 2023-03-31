const mongoose=require('mongoose')//載入mongoose
const restaurantData=require('../restaurantData')//載入model
const restaurantList=require('../../restaurant.json')//載入種子資料


const restaurant_list = restaurantList.results

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db=mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open',()=>{
  console.log('mongodb connected!')
  restaurant_list.forEach(restaurant=>{
    restaurantData.create({

      name:restaurant.name,
      category:restaurant.category,
      image:restaurant.image,
      location:restaurant.location,
      phone:restaurant.phone,
      google_map:restaurant.google_map,
      rating:restaurant.rating,
      description:restaurant.description

    })
  })
  console.log('done')
})

