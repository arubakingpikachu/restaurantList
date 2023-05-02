const mongoose = require('mongoose')

const restaurantData = require('../restaurantData')//引入餐廳model
const userData=require('../user')//引入使用者model
const restaurantList = require('../../restaurant.json').results//引入餐廳的json
const seederUser= [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    collection: [0, 1, 2]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    collection: [3, 4, 5]
  }
]
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs/dist/bcrypt')//引入bcrypt
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}




db.once('open', () => {
  Promise
  .all(seederUser.map(seedUser=>{
    bcrypt
    .genSalt(10)
    .then(salt=>bcrypt.hash(seedUser.password,salt))
    .then(hash=>userData.create({
      name:seedUser.name,
      email:seedUser.email,
      password:hash
    }))
    .then(user=>{
      const userId=user._id//種子使用者的_id
      const perRestIndex=seedUser.collection.map(index=>{restaurant_list[index].userId=userId//從seedUser中取出各種子使用者的collection(各帳號對應)
      return restaurantList[index]})//把種子使用者的_id跟種子餐廳的useId掛勾，這樣當接下來要創種子資料時，種子資料的userId才會跟user關聯。
      return restaurantData.create(perRestIndex)
    })
  }))
  .then(() => {
    console.log('done')
    process.exit()
  })
})
  