const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/policy', (req, res, next) => {
  res.render('policy')
})

module.exports = router