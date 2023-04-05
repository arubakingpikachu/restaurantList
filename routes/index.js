const express = require('express')
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')

const router = express.Router()
router.use('/', home)
router.use('/restaurants', restaurants)// 篩選符合/restaurants者

module.exports = router
