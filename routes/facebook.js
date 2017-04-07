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
    successRedirect: '/facebook/loggedin',
    failureRedirect: '/facebook/login'
  })
)

router.get('/loggedin', (req, res, next) => {
  console.log(req)
})

module.exports = router