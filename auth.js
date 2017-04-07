const passport = require('passport')
const bcrypt = require('bcrypt')
const users = require('./helpers/db_users')
const LocalStrategy = require('passport-local').Strategy

// TODO: Remove console.logs

const setupPassport = () => {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      users.findByUsername(username)
      .then((user) => {
        user = user[0]
        if (!user) { console.log('no such user') } else { console.log(`User ${user.username} is valid`) }
        if (!user) return done(null, false)
        bcrypt.compare(password, user.password_hash, (err, res) => {
          console.log('password correct', res)
          return done(null, res && user)
        })
      })
      .catch((err) => {
        console.error('error in auth.js LocalStrategy', err)
      })
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    users.findByID(id)
    .then(user => {
      return done(null, user)
    })
    .catch(err => {
      console.error('error deserializing user', err)
    })
  })
}

module.exports = { setupPassport }