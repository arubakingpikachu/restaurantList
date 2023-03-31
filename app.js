const express = require('express')
const mongoose=require('mongoose')
const exphbs = require('express-handlebars')
const RestData=require('./models/restaurantData')


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

app.get('/',(req,res)=>{
  RestData.find()
  .lean()
  .then(restaurants=>res.render('index',{restaurants}))
  .catch(error => console.error(error))
})



app.listen(port,()=>{
  console.log(`Express is listening on localhost:${port}`)
})
