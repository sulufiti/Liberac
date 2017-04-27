const express = require('express')
const router = express.Router()
const Raven = require('raven')
const users = require('../helpers/users')
const contacts = require('../helpers/contacts')

router.get('/send', (req, res, next) => {
  contacts.getUsersContacts(req.session.passport.user.id)
  .then((userContacts) => {
    res.render('selectcontact', { contacts: userContacts })
  })
  .catch((err) => {
    console.error('Failed to fetch user contacts', err)
    Raven.captureException(err)
  })
})

router.post('/selectcontact', (req, res, next) => {
  console.log(req.body)
})

module.exports = router
