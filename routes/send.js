const express = require('express')
const router = express.Router()
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
  // req.session.passport.transaction = {
  //   receiver: req.body.contact
  // }

  // switch(req.body.deliverymethod) {
  //   case 'bank_transfer':
  //     transaction.handling_fee = 10.00
  //     break
  //   case 'hand_delivery':
  //     transaction.handling_fee = 15.00
  //     break
  //   default:
  //     console.error('Invalid delivery method specified')
  //     Raven.captureException(err, { user: { loggedInUser: req.session.passport.user, transaction: req.body } })
  // }
  contacts.getContactByNickname(req.session.passport.user.id, req.body.contact)
  .then((contact) => {
    res.render('transaction_details', { contact: contact })
  })
})

router.post('/send/confirmation', (req, res, next) => {
  res.send('money')
})

module.exports = router
