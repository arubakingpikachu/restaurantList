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
  const errors = []
  if(!email||!password||!confirmPassword){
    errors.push({message:'email、password、confirmPassword為必填項!'})
  }
  if(password!==confirmPassword){
    errors.push({message:'密碼與確認密碼不相符！'})
  }
  if(errors.length){
    return res.render('register',{
      errors,
      name:name,
      email:email,
      password:password,
      confirmPassword:confirmPassword
    })
  }
  userData.findOne({email})
  .then(user=>{
    if(user){
      errors.push({message:'這組email已經註冊了'})
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
        
      })
      .then(()=>res.redirect('/'))
      .catch(error => console.error(error))
    }
  })
  .catch(error => console.error(error))
})


router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '成功登出！')
  res.redirect('/users/login')
})

module.exports = router