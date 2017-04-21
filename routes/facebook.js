const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/login',
  passport.authenticate('facebook', {
    scope: ['email', 'user_friends']
  })
)

router.get('/return',
  passport.authenticate('facebook', {
    failureRedirect: '/',
    successRedirect: '/profile'
  })
)

router.get('/profile', (req, res, next) => {
  res.send('check terminal')
})

module.exports = router
