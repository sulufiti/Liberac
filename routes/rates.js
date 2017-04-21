const express = require('express')
const Raven = require('raven')
const Xray = require('x-ray')
const x = Xray()
const router = express.Router()

router.get('/NZD', (req, res, next) => {
  x('https://www.google.com/finance?q=NZDWST', '.bld')((err, rate) => {
    if (err) {
      Raven.captureException(err)
    } else {
      res.json({ 'WST': rate.slice(0, 6) })
    }
  })
})

module.exports = router
