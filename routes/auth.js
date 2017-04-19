const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const users = require('../helpers/users')
const payees = require('../helpers/payees')
const cloudcheck = require('../helpers/cloudcheck')
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
    successRedirect: '/dashboard', 
    failureRedirect: '/login' 
  })
)

router.get('/dashboard', (req, res, next) => {
  // $0 becomes $0.00
  req.session.passport.user.balance.toFixed(2)
  res.render('dashboard', { user: req.session.passport.user })
})

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/login')
})

router.get('/payees', (req, res, next) => {
  payees.getUsersPayees(req.session.passport.user.id)
  .then((usersPayees) => {
    res.render('payees', { name: req.session.passport.user.first_name, payees: usersPayees })
  })
  .catch((err) => {
    console.error('error fetching users payees', err)
  })
})

router.post('/payees', (req, res, next) => {
  payees.addPayee(req.session.passport.user.id, req.body)
  .then(() => {
    res.redirect('/payees')
  })
  .catch((err) => {
    console.error('error redirecting to payees', err)
  })
})

router.get('/payees/add', (req, res, next) => {
  res.render('addpayee', { name: req.session.passport.user.first_name })
})

router.get('/cloudcheck', (req, res, next) => {
  cloudcheck.verifyUser(req.session.passport.user, req.query.nonce)
  .then((response) => {
    console.log('res from cloudcheck', response)
    res.render('dashboard', {
      first_name: req.session.passport.user.first_name,
      balance: (req.session.passport.user.balance).toFixed(2),
      verified: req.session.passport.user.verified
    })
  })
  .catch((err) => {
    console.error('error verifying', err)
  })
})

module.exports = router