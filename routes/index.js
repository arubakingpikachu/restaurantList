const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users=require('./modules/users')
const authenticator=require('../middleware/auth').authenticator



router.use('/restaurants',authenticator, restaurants)// 篩選符合/restaurants者
router.use('/users',users)
router.use('/',authenticator ,home)

module.exports = router
