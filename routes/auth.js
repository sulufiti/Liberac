const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const mailer = require('../helpers/mailer')
const error = require('../helpers/error')
const users = require('../helpers/users')
const validate = require('../helpers/validation')
const saltRounds = 10

router.get('/register', (req, res, next) => {
  res.render('register')
})

router.post('/register', (req, res, next) => {
  // If no errors, result will be an empty array '[]' hence why we're checking if length is 0
  let validationErrors = validate.registration(req.body)
  if (!validationErrors.length) {
    bcrypt.hash(req.body.password, saltRounds)
    .then(hash => req.body.password = hash)
    .then(() => { return users.register(req.body) })
    .then((user_id) => { users.storeDocuments(user_id[0], req.files) })
    .then(() => { res.redirect('/') })
    .catch((err) => { error.capture(err) })
  } else {
    error.capture(validationErrors)
  }
})

router.get('/login', (req, res, next) => {
  let latestMessage = ''
  if (req.session.flash && req.session.flash.length !== 0) {
    let messages = req.session.flash.error
    latestMessage = messages[messages.length - 1]
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
  delete req.session
  res.redirect('/')
})

module.exports = router
