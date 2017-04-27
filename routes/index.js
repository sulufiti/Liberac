const express = require('express')
const Raven = require('raven')
const Message = require('pushover-promise').Message
const msg = new Message(process.env.PUSHOVER_USER, process.env.PUSHOVER_TOKEN)
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
    .then(() => {
      msg.push(`${req.body.firstName} ${req.body.lastName} just registered their interest!`)
    })
    .then(() => {
      mailer.notifyTeam(`${req.body.firstName} ${req.body.lastName}`, req.body.email)
    })
    .then(() => {
      mailer.sendWelcome(req.body.firstName, req.body.lastName, req.body.email)
    })
    .catch((err) => {
      console.error(err)
      Raven.captureException(err, {
        level: 'warning',
        user: {
          name: `${req.body.firstName} ${req.body.lastName}`,
          email: req.body.email
        }
      })
      res.redirect('/')
    })
  } else {
    Raven.captureMessage('Tried to send an empty sign up. Spam bot?', {
      level: 'warning',
      user: {
        name: `${req.body.firstName} ${req.body.lastName}`,
        email: req.body.email
      }
    })
    res.redirect('/')
  }
})

router.get('/policy', (req, res, next) => {
  res.render('policy')
})

router.get('/about', (req, res, next) => {
  res.render('about')
})

router.get('/compare', (req, res, next) => {
  res.render('compare', { comparison: true })
})

router.get('/dashboard', (req, res, next) => {
  // $0 becomes $0.00
    res.render('dashboard', { user: req.session.passport.user })
  // })
})

module.exports = router
