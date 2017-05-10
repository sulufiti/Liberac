const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const router = express.Router()
const uuidV4 = require('uuid/v4')
const mailer = require('../helpers/mailer')
const error = require('../helpers/error')
const validate = require('../helpers/validation')
const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])

router.get('/', (req, res, next) => {
  res.render('index', { indexjs: true })
})

router.post('/', (req, res, next) => {
  // If no errors, result will be an empty array '[]' hence why we're checking if length is 0
  let validationErrors = validate.registerInterest(req.body)
  if (!validationErrors.length) {
    knex('contact')
    .insert({
      id: uuidV4(),
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email
    })
    .then(() => {
      res.redirect('/')
    })
    .then(() => {
      if (process.env.NODE_ENV !== 'development') {
        mailer.userOnboarding(req.body.firstName, req.body.lastName, req.body.email)
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
    error.capture(validationErrors)
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
    .then(charge => {
      console.log('charge', charge)
      res.send(charge)
      knex('transaction')
      .insert({
        id: uuidV4(),
        stripe_id: charge.id,
        stripe_customer_id: charge.customer,
        stripe_status: charge.status,
        sender: req.session.passport.user.id,
        receiver: req.body.receiver_name,
        receiver_account: req.body.bank_account,
        amount: charge.amount,
        currency: charge.currency.toUpperCase()
      })
      .catch((err) => {
        error.capture(err)
      })
    })
  )
  .catch(err => {
    error.capture(err, {
      user: req.body
    })
    res.status(500).send({ error: 'Purchase Failed' })
  })
})

module.exports = router
