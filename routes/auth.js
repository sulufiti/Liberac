const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const user = require('../helpers/db_users.js')
const cloudcheck = require('../helpers/cloudcheck')
const saltRounds = 10

router.get('/register', (req, res, next) => {
  res.render('register' , { datepicker: true })
})

router.post('/register', (req, res, next) => {
  console.log(req.body)
  bcrypt.hash(req.body.password, saltRounds)
  .then(hash => req.body.password = hash)
  .then(() => {
    user.register(req.body)
    .then(() => res.redirect('/login'))
    .catch((err) => {
      res.send('user already exists in database')
      console.error(err)
    })
  })
})

router.get('/login', (req, res, next) => {
  res.render('login')
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loggedin', 
    failureRedirect: '/login' 
  })
)

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/loggedout')
})

router.get('/userinfo', (req, res, next) => {
  res.render('userinfo', { user: req.session.passport.user })
})

router.get('/cloudcheck', (req, res, next) => {
  cloudcheck.verifyUser(req.session.passport.user, 7)
  .then((response) => {
    console.log(response.data)
  })
  .catch((err) => {
    console.error(err)
  })
})

router.get('/loggedout', (req, res, next) => {
  res.send('logged out')
})

module.exports = router