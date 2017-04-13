const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const azure = require('azure-storage')
const user = require('../helpers/db_users.js')
const router = express.Router()
const blobService = azure.createBlobService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY)

router.get('/', (req, res, next) => {
  console.log(req.session)
  res.render('upload', { id: req.session.passport.user.id, first_name: req.session.passport.user.first_name, datepicker: true })
})

router.post('/', (req, res, next) => {
  user.appendIDproofs(req.body.userid, req.body.passportnumber, req.body.passportexpiry)
  blobService.createBlockBlobFromText('passports', req.body.userid, req.files.passport.data, (error, result, response) => {
    if (!error) {
      blobService.createBlockBlobFromText('addressproofs', req.body.userid, req.files.addressproof.data, (error, result, response) => {
        if (!error) {
          res.render('success', { id: req.session.passport.user.id })
        }
      })
    }
  })
})

module.exports = router