const express = require('express')
const router = express.Router()
const Raven = require('raven')
const users = require('../helpers/users')

router.get('/send', (req, res, next) => {
  contacts.getUsersContacts(req.session.passport.user.id)
  .then((userscontacts) => {
    res.render('contacts', { name: req.session.passport.user.first_name, contacts: userscontacts })
  })
  .catch((err) => {
    console.error(err)
    Raven.captureException(err)
  })
})

router.post('/selectcontacts', (req, res, next) => {
  console.log(req.body)
})

module.exports = router
