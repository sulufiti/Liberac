const express = require('express')
const router = express.Router()
const mailer = require('../helpers/mailer')

router.get('/agents', (req, res, next) => {
  res.render('agents', { first_name: req.session.passport.user.first_name })
})

router.get('/agentapplication', (req, res, next) => {
  mailer.sendAgentInvite(req.session.passport)
  res.redirect('/dashboard')
})

module.exports = router