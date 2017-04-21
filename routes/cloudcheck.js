const express = require('express')
const router = express.Router()
const Raven = require('raven')
const cloudcheck = require('../helpers/cloudcheck')

router.get('/cloudcheck', (req, res, next) => {
  cloudcheck.verifyUser(req.session.passport.user, req.query.nonce)
  .then((response) => {
    console.log('res from cloudcheck', response)
    res.render('dashboard', {
      first_name: req.session.passport.user.first_name,
      balance: (req.session.passport.user.balance).toFixed(2),
      verified: req.session.passport.user.verified
    })
  })
  .catch((err) => {
    Raven.captureException(err)
  })
})

module.exports = router
