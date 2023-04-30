const express = require('express')
const exphbs = require('express-handlebars')
const RestData = require('./models/restaurantData')
const methodOverride = require('method-override')
const routes = require('./routes')
const session = require('express-session')
require('./config/mongoose')

const port = 3000

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))// 在 Express 中提供靜態檔案
app.use(express.urlencoded({ extended: true }))// 使用 body-parser
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
