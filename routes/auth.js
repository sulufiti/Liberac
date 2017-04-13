const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const user = require('../helpers/db_users.js')
const saltRounds = 10

router.get('/register', (req, res, next) => {
  res.render('register' , { register: true })
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

router.get('/loggedin', (req, res, next) => {
  res.render('loggedin', { first_name: req.session.passport.user.first_name })
})

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/loggedout')
})

router.get('/userinfo', (req, res, next) => {
  res.render('userinfo', { user: req.session.passport.user })
})

router.get('/loggedout', (req, res, next) => {
  res.send('logged out')
})

module.exports = router