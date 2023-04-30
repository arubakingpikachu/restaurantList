const express = require('express')
const router = express.Router()
const userData=require('../../models/user')
const passport=require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/users/login' }))

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


router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router