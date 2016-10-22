import passport from 'passport'
import User from '../models/user'
import password from './password'

var LocalStrategy = require('passport-local').Strategy


passport.serializeUser( (user, done) => {
  console.log('serializeUser', user.get())
  done(null, user.get('id'))
})

passport.deserializeUser(async (id, done) => {
  console.log('deserializeUser', id)
  try{
        let user = await User.findById(id)
        done(null, user)
  } catch (ex){
      done(ex)
  }
  
})

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async  (email, pass, done) => {
    console.log('passport LocalStrategy', email, password)
    try{
        console.log('user:', User);
        
        let user = await User.findOne({where: {email: email}});
        if (!user) return done(null, null);
        
        try {
            await password.verifyPassword(user.get('local'), pass)
        } catch (e) {
            return done('WRONG_PASSWORD', null)
        }

        done(null, user)

    } catch (ex){
        done(ex)
    }
}))

module.exports = function (app) {
  app.use(passport.initialize())
  app.use(passport.session())
}
