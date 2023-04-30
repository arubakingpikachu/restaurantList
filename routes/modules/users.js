const express = require('express')
const router = express.Router()
const userData=require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
})

router.get('/register', (req, res) => {
  res.render('register')})

router.post('/register',(req,res)=>{
  const {name,email,password,confirmPassword}=req.body
  userData.findOne({email})
  .then(user=>{
    if(user){
      res.render('register',{
        name:name,
        email:email,
        password:password,
        confirmPassword:confirmPassword
      })
    }else{
      return userData.create({
        name:name,
        email:email,
        password:password,
        confirmPassword:confirmPassword
      })
      .then(()=>res.redirect('/'))
      .catch(error => console.error(error))
    }
  })
  .catch(error => console.error(error))
})

  
module.exports = router