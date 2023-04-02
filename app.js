const express = require('express')
const mongoose=require('mongoose')
const exphbs = require('express-handlebars')
const RestData=require('./models/restaurantData')
const restaurantData = require('./models/restaurantData')
const methodOverride = require('method-override') 


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const port = 3000

const app = express()
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })


const db=mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open',()=>{
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))//在 Express 中提供靜態檔案
app.use(express.urlencoded({extended:true}))//使用 body-parser
app.use(methodOverride('_method'))

app.get('/',(req,res)=>{
  RestData.find()
  .lean()
  .then(restaurants=>res.render('index',{restaurants}))
  .catch(error => console.error(error))
})//純瀏覽

app.get('/restaurants/new',(req,res)=>{
  return res.render('new')
})//新增頁面

app.post('/restaurants',(req,res)=>{
  console.log(req.body)
  restaurantData.create(req.body)
  .then(()=>{res.redirect('/')})
  .catch(error => console.error(error))
})//po出新增頁面

app.get('/restaurants/:id',(req,res)=>{
  const id=req.params.id
  return restaurantData.findById(id)
  .lean()
  .then(restaurant=>res.render('show',{restaurant}))
  .catch(error => console.error(error))
  
})//瀏覽特定畫面

app.get('/restaurants/:id/edit',(req,res)=>{
  const id=req.params.id
  return restaurantData.findById(id)
  .lean()
  .then(restaurant=>res.render('edit',{restaurant}))
  .catch(error => console.error(error))
})//顯示編輯畫面

app.put('/restaurants/:id',(req,res)=>{
  const id = req.params.id
  restaurantData.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))

})//編輯條目

app.delete('/restaurants/:id',(req,res)=>{
  const id=req.params.id
  return restaurantData.findById(id)
  .then(restaurant=>restaurant.remove())
  .then(()=>res.redirect('/'))
  .catch(error => console.log(error))
})//刪除條目





app.listen(port,()=>{
  console.log(`Express is listening on localhost:${port}`)
})
