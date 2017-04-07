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

        if (!user) {
          return done(null, false, { message: 'Incorrect or non-existant username' })
        }

        bcrypt.compare(password, user.password_hash, (err, res) => {
          if (!res) {
            return done(null, false, { message: 'Incorrect password' })
          } else {
          return done(null, user)
          }
        })
      })
      .catch((err) => {
        console.error('error in auth.js LocalStrategy', err)
      })
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((id, done) => {
    console.log('deserialize')
    return users.findByID(id)
    .then((user) => {
      return done(null, user)
    })
    .catch((err) => {
      console.error('error deserializing user', err)
    })
  })
}

module.exports = { setupPassport }