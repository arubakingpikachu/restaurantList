const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')

const restaurantList=require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))//在 Express 中提供靜態檔案

app.get('/',(req,res)=>{
  res.render('index',{restaurants:restaurantList.results})
})

app.get('/restaurants/:restaurants_id',(req,res)=>{
  const filterRestaurant=restaurantList.results.find(restaurant=>
    restaurant.id.toString()===req.params.restaurants_id
  )
  res.render('show',{restaurant:filterRestaurant})
})

app.get('/search',(req,res)=>{const keyword=req.query.keyword
  const restaurants=restaurantList.results.filter(restaurant=>{
    return restaurant.name.toLowerCase().includes(keyword)||restaurant.category.includes(keyword)} )
  if(restaurants.length===0){res.render('wrong',{keyword:keyword})}
  else{res.render('index', {restaurants:restaurants, keyword: keyword})}
  
  
  }
)

app.listen(port,()=>{
  console.log(`Express is listening on localhost:${port}`)
})

