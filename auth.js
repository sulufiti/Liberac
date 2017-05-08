const passport = require('passport')
const bcrypt = require('bcrypt')
const Raven = require('raven')
const users = require('./helpers/users')
const error = require('./helpers/error')
const LocalStrategy = require('passport-local').Strategy

module.exports.setupPassport = () => {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      users.findByUsername(username)
      .then((user) => {
        if (!user) {
          // Return to /login if the username doesn't exist
          return done(null, false, { message: 'Please check that your email and password are correct.' })
        }

        bcrypt.compare(password, user.password, (err, res) => {
          if (!res) {
            // Return to /login if the password doesn't match
            return done(null, false, { message: 'Please check that your email and password are correct.' })
          } else {
            // Go to /loggedin if passwords match
            return done(null, user)
          }
        })
      })
      .catch((err) => {
        return done(err)
        error.capture(err)
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
      error.capture(err)
    })
  })
}
