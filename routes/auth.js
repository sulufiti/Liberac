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
      Raven.captureException(err)
    })
  })
  .catch((err) => {
    Raven.captureException(err, {
        user: {
          username: req.body.username,
          password: req.body.password,
          firstName: req.body.first_name,
          middleName: req.body.middle_name,
          lastName: req.body.last_name,
          phone: req.body.phone,
          email: req.body.email,
          street: req.body.street,
          suburb: req.body.suburb,
          dateofbirth: req.body.dateofbirth,
          city: req.body.city,
          postcode: req.body.city
        }
      })
  })
})

router.get('/activate/:id', (req, res, next) => {
  users.findByID(req.params.id)
  .then((user) => {
    return users.activateUser(req.params.id)
  })
  .then(() => {
    if (req.session.flash) {
      req.session.flash = []
    }
    res.redirect('/login')
  })
  .catch((err) => {
    Raven.captureException(err, {
      user: {
        id: req.params.id
      }
    })
  })
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
  res.redirect('/login')
})

module.exports = router
