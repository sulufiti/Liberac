const express = require('express')
const Raven = require('raven')
const router = express.Router()
const mailer = require('../helpers/mailer')
const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])

router.get('/', (req, res, next) => {
  res.render('index')
})

router.post('/', (req, res, next) => {
  if (req.body.firstName && req.body.lastName && req.body.email) {
    knex('contacts')
    .insert({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email
    })
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      console.error(err)
      Raven.captureException(err)
      res.redirect('/')
    })
  } else {
    Raven.captureMessage('Tried to send an empty sign up. Spam bot?')
    res.redirect('/')
  }
})

router.get('/policy', (req, res, next) => {
  res.render('policy')
})

router.get('/about', (req, res, next) => {
  res.render('about')
})

router.get('/dashboard', (req, res, next) => {
  // $0 becomes $0.00
  req.session.passport.user.balance.toFixed(2)
  res.render('dashboard', { user: req.session.passport.user })
})

module.exports = router
