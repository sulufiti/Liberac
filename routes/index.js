const express = require('express')
const router = express.Router()

router.get('/testing', (req, res, next) => {
  res.render('index')
})

module.exports = router