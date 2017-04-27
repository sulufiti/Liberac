const express = require('express')
const router = express.Router()

router.get('/agents', (req, res, next) => {
  res.render('agents', { first_name: req.session.passport.user.first_name })
})

module.exports = router