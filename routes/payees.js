const express = require('express')
const router = express.Router()
const users = require('../helpers/users')
const payees = require('../helpers/payees')

router.get('/payees', (req, res, next) => {
  payees.getUsersPayees(req.session.passport.user.id)
  .then((usersPayees) => {
    res.render('payees', { name: req.session.passport.user.first_name, payees: usersPayees })
  })
  .catch((err) => {
    console.error('error fetching users payees', err)
  })
})

router.get('/payees/add', (req, res, next) => {
  res.render('addpayee')
})

router.post('/payees/add', (req, res, next) => {
  payees.addPayee(req.session.passport.user.id, req.body)
  .then(() => {
    res.redirect('/payees')
  })
  .catch((err) => {
    console.error('error redirecting to payees', err)
  })
})

router.post('/payees/edit/:name', (req, res, next) => {
  payees.getPayeeByNickname(req.session.passport.user.id, req.params.name)
  .then((payeeDetails) => {
    res.render('addpayee', { name: req.session.passport.user.first_name, payee: payeeDetails })
  })
  .catch((err) => {
    console.error('error fetching payee by nickname', err)
  })
})

router.post('/payees/update/:name', (req, res, next) => {
  payees.updatePayee(req.session.passport.user.id, req.body)
  .then(() => {
    res.redirect('/payees')
  })
  .catch((err) => {
    console.error('error redirecting to payees', err)
  })
})

module.exports = router