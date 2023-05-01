const express = require('express')
const userData=require('../../models/user')
const passport=require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/users/login' }))

router.get('/register', (req, res) => {
  res.render('register')})

router.post('/register',(req,res)=>{
  const { name, email, password, confirmPassword } = req.body
  const errors=[]
  if(!email||!password||!confirmPassword){errors.push({message:'email、password、confirmPassword是必填的'})}
  if (password !== confirmPassword) {errors.push({ message: '密碼與確認密碼不相符！' })}
  if(errors.length){return res.render('register',{
      errors,
      name,
      email,
      password,
      confirmPassword
  })}
  userData.findOne({email})
  .then(user=>{if(user){
      errors.push({message:'這個email已註冊'})
       res.render('register',{errors,name,email,password,confirmPassword})
  }else{return bcrypt.genSalt(10).then(salt => bcrypt.hash(password, salt)).then(hash=>userData.create({name,email,password:hash}))
  
  .then(() => res.redirect('/'))
  .catch(err => console.log(err))
}
  })
  .catch(err => console.log(err))
})


router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '成功登出！')
  res.redirect('/users/login')
})

module.exports = router