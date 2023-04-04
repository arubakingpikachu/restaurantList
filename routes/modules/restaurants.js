const express = require('express')
const RestData = require('../../models/restaurantData')

const router = express.Router()

router.get('/new', (req, res) => {
  return res.render('new')
})// 新增頁面

router.post('/', (req, res) => {
  RestData.create(req.body)
    .then(() => { res.redirect('/') })
    .catch(error => console.error(error))
})// 新增資料

router.get('/:id', (req, res) => {
  const id = req.params.id
  return RestData.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})// 瀏覽特定條目

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return RestData.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})// 顯示編輯畫面

router.put('/:id', (req, res) => {
  const id = req.params.id
  RestData.findById(id)
    .then(restaurant => { return restaurant.update(req.body) })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})// 儲存編輯條目

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return RestData.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})// 刪除條目

module.exports=router