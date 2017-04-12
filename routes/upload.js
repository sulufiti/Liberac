const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const azure = require('azure-storage')
const user = require('../helpers/db_users.js')
const router = express.Router()
const blobService = azure.createBlobService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY)

router.get('/', (req, res, next) => {
  user.findByUsername('samuel1234')
  .then(user => {
    res.render('upload', { id: user.id, name: user.first_name })
  })
})

router.post('/', (req, res, next) => {
  blobService.createBlockBlobFromText('passports', req.body.userid, req.files.passport.data, (error, result, response) => {
    if (!error) {
      blobService.createBlockBlobFromText('addressproofs', req.body.userid, req.files.addressproof.data, (error, result, response) => {
        if (!error) {
          res.render('success')
        }
      })
    }
  })
})

module.exports = router