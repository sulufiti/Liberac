const passport = require('passport')
const bcrypt = require('bcrypt')
const Raven = require('raven')
const users = require('./helpers/users')
const LocalStrategy = require('passport-local').Strategy

const setupPassport = () => {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      users.findByUsername(username)
      .then((user) => {
        if (!user) {
          // Return to /login if the username doesn't exist
          return done(null, false)
        }

        bcrypt.compare(password, user.password, (err, res) => {
          if (!res) {
            // Return to /login if the password doesn't match
            return done(null, false)
          } else {
            // Go to /loggedin if passwords match
            return done(null, user)
          }
        })
      })
      .catch((err) => {
        Raven.captureException(err)
      })
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((id, done) => {
    users.findByID(id)
    .then((user) => { return done(null, user) })
    .catch((err) => {
      Raven.captureException(err)
    })
  })
}

module.exports = {
  setupPassport
}
