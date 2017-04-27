const express = require('express')
const router = express.Router()
const Raven = require('raven')
const passport = require('passport')
const bcrypt = require('bcrypt')
const mailer = require('../helpers/mailer')
const users = require('../helpers/users')
const saltRounds = 10

router.get('/register', (req, res, next) => {
  res.render('register')
})

router.post('/register', (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds)
  .then(hash => req.body.password = hash)
  .then(() => {
    return users.register(req.body)
    .then(() => res.redirect('/login?activation_prompt=show'))
    .then(() => {
      if (process.env.NODE_ENV !== 'development') {
        users.findByEmail(req.body.email)
        .then((user) => {
          mailer.sendActivation(user.id, user.first_name, user.last_name, user.email)
        })
      }
    })
    .catch((err) => {
      Raven.captureException(err)
    })
  })
  .catch((err) => {
    console.log(err)
    Raven.captureException(err, { user: req.body })
  })
})

router.get('/activate/:id', (req, res, next) => {
  users.findByID(req.params.id)
  .then((user) => {
    return users.activateUser(req.params.id)
  })
  .then(() => {
    if (req.session.flash) {
      req.session.flash.error = []
    }
    res.redirect('/login')
  })
  .catch((err) => {
    Raven.captureException(err, {
      user: { id: req.params.id }
    })
  })
})

router.get('/login', (req, res, next) => {
  let latestMessage = ''
  if (req.session.flash && req.session.flash.length !== 0) {
    let messages = req.session.flash.error
    latestMessage = messages[messages.length - 1]
  }

  if (req.query.activation_prompt === 'show') {
    latestMessage = 'Please check your email for an account activation link.'
  }

  res.render('login', { message: latestMessage })
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })
)

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/login')
})

module.exports = router
