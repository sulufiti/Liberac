const passport = require('passport')
const bcrypt = require('bcrypt')
const Raven = require('raven')
const users = require('./helpers/users')
const LocalStrategy = require('passport-local').Strategy

const setupPassport = () => {
  passport.use(new LocalStrategy(
    (email, password, done) => {
      users.findByEmail(email)
      .then((user) => {
        if (!user) {
          // Return to /login if the username doesn't exist
          return done(null, false, { message: 'Please check that your email and password are correct.' })
        }

        // If the user isn't activated, prompt them to activate their account
        if (!user.activated) {
          return done(null, false, { message: 'Please activate your account using the validation email we sent you.'})
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
        console.error(err)
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
      console.error(err)
      Raven.captureException(err)
    })
  })
}

module.exports = {
  setupPassport
}
