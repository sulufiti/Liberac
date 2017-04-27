const express = require('express')
const router = express.Router()
const got = require('got')
const Raven = require('raven')
const users = require('../helpers/users')
const contacts = require('../helpers/contacts')

router.get('/', (req, res, next) => {
  contacts.getUsersContacts(req.session.passport.user.id)
  .then((userContacts) => {
    res.render('selectcontact', { contacts: userContacts })
  })
  .catch((err) => {
    console.error('Failed to fetch user contacts', err)
    Raven.captureException(err)
  })
})

router.post('/amount', (req, res, next) => {
  req.session.passport.transaction = {
    receiver: req.body.contact
  }

  switch(req.body.deliverymethod) {
    case 'bank_transfer':
      req.session.passport.transaction.handling_fee = 10.00
      break
    case 'hand_delivery':
      req.session.passport.transaction.handling_fee = 15.00
      break
    default:
      console.error('Invalid delivery method specified')
      Raven.clientMessage('Invalid delivery method specified')
      res.redirect('/send')
      break
  }

  let root = ''

  switch(process.env.NODE_ENV) {
    case 'development':
      root = 'http://localhost:3000'
      break
    case 'staging':
      root = 'https://staging.liberac.co.nz'
      break
    case 'production':
      root = 'https://liberac.co.nz'
      break
    default:
      root = 'https://liberac.co.nz'
      break
  }

  got(`${root}/rates/NZD`)
  .then((data) => {
    data.body = JSON.parse(data.body)
    current_rate = data.body.WST
    
    req.session.passport.transaction.exchange_rate = current_rate
  })
  .then(() => {
    contacts.getContactByNickname(req.session.passport.user.id, req.body.contact)
    .then((contact) => {
      res.render('transaction_details', { contact: contact })
    })
    .catch((err) => {
      console.error('failed to fetch contact details')
      Raven.captureException(err, { user: { user: req.session.passport.user, transaction: req.session.passport.transaction } })
    })
  })
  .catch((err) => {
    console.error('failed to fetch current exchange rate')
    Raven.captureException(err, { user: { user: req.session.passport.user, transaction: req.session.passport.transaction } })
  })
})

router.post('/confirm', (req, res, next) => {
  req.session.passport.transaction.amount = req.body.amount
  res.render('transaction_confirm', { transaction: req.session.passport.transaction })
})

router.post('/process', (req, res, next) => {
  console.log(req.body)
})

module.exports = router
