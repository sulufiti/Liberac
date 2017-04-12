const express = require('express')
const Xray = require('x-ray')
const x = Xray()
const router = express.Router()

router.get('/NZD', (req, res, next) => {
  x('https://www.google.com/finance?q=NZDWST', '.bld')((err, rate) => {
    if (err) {
      res.json('Something went wrong')
    } else {
      res.json({ 'WST': rate.slice(0, 6) })
    }
  })
})

module.exports = router