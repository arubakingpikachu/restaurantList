const express = require('express')
const exphbs = require('express-handlebars')
const RestData = require('./models/restaurantData')
const methodOverride = require('method-override')
const routes = require('./routes')
const session = require('express-session')
const usePassport=require('./config/passport')
const flash=require('connect-flash')
require('./config/mongoose')

const port = process.env.port

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))// 在 Express 中提供靜態檔案
app.use(express.urlencoded({ extended: true }))// 使用 body-parser
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(flash())
app.use((req,res,next)=>{
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg=req.flash('success_msg')
  res.locals.warning_msg=req.flash('warning_msg')
  next()
})
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
