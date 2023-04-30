const passport = require('passport')
const LocalStrategy=require('passport-local').Strategy
const userData=require('../models/user')

module.exports=app=>{
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email' },(email, password, done)=>{

      userData.findOne({ email })
      .then(user=>{
        if (!user) { return done(null, false,{ message: 'That email is not registered!'})}
        if (user.password!==password){return done(null, false,{ message: 'That email is not registered!'})}
        return done(null, user)
      })
      .catch(error => console.error(error))
    }
  ))
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    userData.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })

}