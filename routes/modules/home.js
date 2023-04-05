const express = require('express')
const RestData = require('../../models/restaurantData')

const router = express.Router()

router.get('/', (req, res) => {
  
  RestData.find()
    .lean()
    .collation({locale: "en"})
    .sort({name_en: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})// 純瀏覽

router.get('/search', (req, res) => {
  console.log(req)
  const keywords = req.query.keyword
  const keyword = keywords.trim().toLowerCase()

  RestData.find()
    .lean()
    .then(restaurantData => {
      const restaurants = restaurantData.filter(data => {
        return data.name.toLowerCase().includes(keyword) || data.category.includes(keyword)
      })
      if (restaurants.length === 0) { res.render('wrong', { keywords }) } else { res.render('index', { restaurants, keywords }) }
    })
    .catch(error => console.error(error))
})// 搜尋功能

module.exports = router
