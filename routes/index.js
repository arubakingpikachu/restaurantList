const express = require('express')
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users=require('./modules/users')

const router = express.Router()
router.use('/', home)
router.use('/restaurants', restaurants)// 篩選符合/restaurants者
router.use('/users',users)

module.exports = router
