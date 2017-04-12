const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const azure = require('azure-storage')
const user = require('../helpers/db_users.js')
const router = express.Router()
const blobService = azure.createBlobService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY)

const saltRounds = 10

router.get('/testing', (req, res, next) => {
  res.render('index')
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