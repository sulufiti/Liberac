const express = require('express')
const passport = require('passport')
const moment = require('moment')
const bcrypt = require('bcrypt')
const azure = require('azure-storage')
const users = require('../helpers/users')
const router = express.Router()
const blobService = azure.createBlobService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY)

router.get('/', (req, res, next) => {
  res.render('upload', { id: req.session.passport.user.id, first_name: req.session.passport.user.first_name })
})

router.post('/', (req, res, next) => {
  users.appendIDproof(req.body.userid, req.body.passport_number, req.body.passport_expiry)
  .then((res) => {
    console.log(res)
    blobService.createBlockBlobFromText('passports', req.body.userid, req.files.passport.data, (error, result, response) => {
      if (!error) {
        blobService.createBlockBlobFromText('addressproofs', req.body.userid, req.files.addressproof.data, (error, result, response) => {
          if (!error) {
            res.redirect('/dashboard')
          }
        })
      }
    })
  })
  .catch((err) => {
    console.log('upload error: ', err)
  })
})

module.exports = router