const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const Message = require('pushover-promise').Message
const msg = new Message(process.env.PUSHOVER_USER, process.env.PUSHOVER_TOKEN)
const router = express.Router()
const mailer = require('../helpers/mailer')
const error = require('../helpers/error')
const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])

router.get('/', (req, res, next) => {
  res.render('index', { indexjs: true })
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
    .then(() => {
      if (process.env.NODE_ENV !== 'development') {
        msg.push(`${req.body.firstName} ${req.body.lastName} just registered their interest!`)
      }
    })
    .then(() => {
      if (process.env.NODE_ENV !== 'development') {
        mailer.notifyTeam(`${req.body.firstName} ${req.body.lastName}`, req.body.email)
      }
    })
    .then(() => {
      if (process.env.NODE_ENV !== 'development') {
        mailer.sendWelcome(req.body.firstName, req.body.lastName, req.body.email)
      }
    })
    .catch((err) => {
      error.capture(err, {
        level: 'warning',
        user: {
          name: `${req.body.firstName} ${req.body.lastName}`,
          email: req.body.email
        }
      })
      res.redirect('/')
    })
  } else {
    error.capture('registration of interest failed to pass input validation')
    res.redirect('/')
  }
})

router.get('/policy', (req, res, next) => {
  res.render('policy')
})

router.get('/terms', (req, res, next) => {
  res.render('terms')
})

router.get('/about', (req, res, next) => {
  res.render('about')
})

router.get('/comingsoon', (req, res, next) => {
  res.render('comingsoon')
})

router.get('/compare', (req, res, next) => {
  res.render('compare', { comparejs: true })
})

router.get('/dashboard', (req, res, next) => {
  res.render('dashboard', { user: req.session.passport.user, stripejs: true })
})

router.post('/charge', (req, res, next) => {
  let amount = req.body.amount

  stripe.customers.create({
    email: req.body.stripe.email,
    card: req.body.stripe.id
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: 'Send payment to TEST_USER',
      currency: 'nzd',
      customer: customer.id
    })
  .then(charge => res.send(charge)))
  .catch(err => {
    console.log(err)
    res.status(500).send({ error: 'Purchase Failed' })
  })
})

module.exports = router
