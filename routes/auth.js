const express = require('express')
const router = express.Router()
const Raven = require('raven')
const passport = require('passport')
const bcrypt = require('bcrypt')
const users = require('../helpers/users')
const saltRounds = 10

router.get('/register', (req, res, next) => {
  res.render('register')
})

router.post('/register', (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds)
  .then(hash => req.body.password = hash)
  .then(() => {
    users.register(req.body)
    .then(() => res.redirect('/login'))
    .catch((err) => {
      console.error(err)
      Raven.captureException(err)
    })
  })
})

router.get('/login', (req, res, next) => {
  res.render('login')
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  })
)

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/login')
})

module.exports = router
