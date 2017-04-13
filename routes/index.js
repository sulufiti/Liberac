const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/policy', (req, res, next) => {
  res.render('policy')
})

router.get('/about', (req, res, next) => {
  res.render('about')
})

router.get('/loggedin', (req, res, next) => {
  res.render('loggedin')
})

module.exports = router