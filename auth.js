const passport = require('passport')
const users = require('./helpers/db_users')
const LocalStrategy = require('passport-local').Strategy

const setupPassport = () => {
  passport.use(new Strategy(
    (username, password, callback) => {
      users.findByUsername(username)
      .then(user => {
        user = user[0]
        if (!user) return done(null, { error: 'no such user' })
        bcrypt.compare(password, user.password_hash, (err, res) => {
          if (err) return console.error(err)
          return done(null, res && user)
        })
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
      console.error(err)
    })
  })
}

module.exports = { setupPassport }