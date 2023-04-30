const express = require('express')
const RestData = require('../../models/restaurantData')

const router = express.Router()

router.get('/new', (req, res) => {
  return res.render('new')
})// 新增頁面

router.post('/', (req,res) => {
  const userId = req.user._id
  
  RestData.create({...req.body,userId})
    .then(() => { res.redirect('/') })
    .catch(error => console.error(error))
})// 新增資料

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return RestData.findOne({_id,userId})
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})// 瀏覽特定條目

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return RestData.findOne({_id,userId})
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})// 顯示編輯畫面

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  RestData.findOne({_id,userId})
    .then(restaurant => { return restaurant.update(req.body) })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})// 儲存編輯條目

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return RestData.findOne({_id,userId})
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})// 刪除條目

module.exports = router
