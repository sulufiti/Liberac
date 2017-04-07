const passport = require('passport')
const bcrypt = require('bcrypt')
const users = require('./helpers/db_users')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

// TODO: Remove console.logs

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
        console.error('error in auth.js LocalStrategy', err)
      })
    }
  ))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/facebook/return',
    profileFields: ['id', 'email', 'name', 'friends']
    }, (accessToken, refreshToken, profile, done) => {
      let user = {
        'id': profile.id,
        'first_name': profile.name.givenName,
        'last_name': profile.name.familyName,
        'email': profile.emails[0].value
      }
      return done(null, user)
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((id, done) => {
    console.log('deserialize')
    users.findByID(id)
    .then((user) => { return done(null, user) })
    .catch((err) => {
      console.error('error deserializing user', err)
    })
  })
}

module.exports = { setupPassport }