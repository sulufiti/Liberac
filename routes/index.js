const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const azure = require('azure-storage')
const user = require('../helpers/db_users.js')
const router = express.Router()
const blobService = azure.createBlobService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY)

const saltRounds = 10

router.get('/register', (req, res, next) => {
  res.render('register')
})

router.post('/confirm', (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds)
  .then(hash => req.body.password = hash)
  .then(() => {
    user.register(req.body)
    .then(() => res.redirect('/login'))
    .catch((err) => {
      res.send('user already exists in database')
      console.error(err)
    })
  })
})

router.get('/login', (req, res, next) => {
  res.render('login')
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loggedin', 
    failureRedirect: '/login' 
  })
)

router.get('/loggedin', (req, res, next) => {
  res.send(`Welcome ${req.session.passport.user.first_name} ${req.session.passport.user.last_name}`)
})

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/loggedout')
})

router.get('/loggedout', (req, res, next) => {
  res.send('logged out')
})

router.get('/fileupload', (req, res, next) => {
  user.findByUsername('samuel1234')
  .then(user => {
    res.render('fileupload', { id: user.id })
  })
})

router.post('/fileupload', (req, res, next) => {
  let user = { 'user': req.body.userid, 'passport': req.files.passport.data, 'address_proof': req.files.addressproof.data }
  blobService.createBlockBlobFromText('passports', req.body.userid, req.files.passport.data, (error, result, response) => {
    if (!error) {
      console.log(result)
      console.log(response)
      res.send('file uploaded')
    }
  })
})

router.get('/listblobs', (req, res, next) => {
  blobService.getBlobToText('passports', 'aa26b364-07d3-4f1f-b63e-f04234e2504b', (error, blobContent, blob) => {
    if (!error) {
      
    }
  })
})

module.exports = router