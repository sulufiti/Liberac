const express = require('express')
const router = express.Router()
const got = require('got')
const uuidV4 = require('uuid/v4')
const moment = require('moment')
const Raven = require('raven')
const transactions = require('../helpers/transactions')
const mailer = require('../helpers/mailer')
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

  switch(req.body.delivery_method) {
    case 'Bank Transfer':
      req.session.passport.transaction.delivery_method = req.body.delivery_method
      req.session.passport.transaction.handling_fee = 10.00
      break
    case 'Hand Delivery':
      req.session.passport.transaction.delivery_method = req.body.delivery_method
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
    current_rate = parseFloat(data.body.WST)
    
    req.session.passport.transaction.exchange_rate = current_rate
  })
  .then(() => {
    contacts.getContactByNickname(req.session.passport.user.id, req.body.contact)
    .then((contact) => {
      res.render('transaction_details', { contact: contact })
    })
  })
  .catch((err) => {
    console.error('failed to fetch current exchange rate')
    Raven.captureException(err, { user: { active_user: req.session.passport.user, transaction: req.session.passport.transaction } })
  })
})

router.post('/confirm', (req, res, next) => {
  req.session.passport.transaction.amount = parseFloat(req.body.amount)
  req.session.passport.transaction.conversion_amount = (req.session.passport.transaction.amount * req.session.passport.transaction.exchange_rate).toFixed(2)
  req.session.passport.transaction.total = (req.session.passport.transaction.amount + req.session.passport.transaction.handling_fee).toFixed(2)

  res.render('transaction_confirm', { transaction: req.session.passport.transaction })
})

router.post('/payment', (req, res, next) => {
  res.render('transaction_payment', { balance: req.session.passport.user.balance, total: req.session.passport.transaction.total })
})

router.post('/process', (req, res, next) => {
  req.session.passport.transaction.id = uuidV4()
  req.session.passport.transaction.time = Date.now()
  transactions.updateBalance(req.session.passport)
  .then((balance) => {
    mailer.sendSenderReceipt(req.session.passport)
    req.session.passport.user.balance = parseFloat(balance).toFixed(2)
    res.render('transaction_receipt', { transaction: req.session.passport.transaction, time: moment(req.session.passport.transaction.time).format("dddd, MMMM Do YYYY, h:mm:ss a") })
  })
})

module.exports = router
