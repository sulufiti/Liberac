const express = require('express')
const router = express.Router()
const Raven = require('raven')
const contacts = require('../helpers/contacts')

router.get('/contacts', (req, res, next) => {
  contacts.getUsersContacts(req.session.passport.user.id)
  .then((userscontacts) => {
    res.render('contacts', { name: req.session.passport.user.first_name, contacts: userscontacts })
  })
  .catch((err) => {
    console.error(err)
    Raven.captureException(err)
  })
})

router.get('/contacts/add', (req, res, next) => {
  res.render('addcontact')
})

router.post('/contacts/add', (req, res, next) => {
  if (!validate.contact(req.body)) {
    contacts.addContact(req.session.passport.user.id, req.body)
    .then(() => {
      res.redirect('/contacts')
    })
    .catch((err) => {
      console.error(err)
      Raven.captureException(err)
    })
  } else {
    console.error('failed to add contact bad inputs')
    Raven.captureMessage(req.body)
    res.redirect('/contacts')
  }
})

router.post('/contacts/edit/:name', (req, res, next) => {
  if (!validate.contact(req.body)) {
    contacts.getContactByNickname(req.session.passport.user.id, req.params.name)
    .then((contactDetails) => {
      res.render('addcontact', { name: req.session.passport.user.first_name, contact: contactDetails })
    })
    .catch((err) => {
      console.error(err)
      Raven.captureException(err)
    })
  } else {
    console.error('failed to edit contact bad inputs')
    Raven.captureMessage(req.body)
    res.redirect('/contacts')
  }
})

router.post('/contacts/update/:name', (req, res, next) => {
  if (!validate.contact(req.body)) {
    contacts.updateContact(req.session.passport.user.id, req.body)
    .then(() => {
      res.redirect('/contacts')
    })
    .catch((err) => {
      console.error(err)
      Raven.captureException(err)
    })
  } else {
    console.error('failed to update contact bad inputs')
    Raven.captureMessage(req.body)
    res.redirect('/contacts')
  }
})

module.exports = router
