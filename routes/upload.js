const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const azure = require('azure-storage')
const user = require('../helpers/db_users.js')
const router = express.Router()
const blobService = azure.createBlobService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY)

router.get('/proof', (req, res, next) => {
  user.findByUsername('samuel1234')
  .then(user => {
    res.render('fileupload', { id: user.id, name: user.first_name })
  })
})

router.post('/proof', (req, res, next) => {
  blobService.createBlockBlobFromText('passports', req.body.userid, req.files.passport.data, (error, result, response) => {
    if (!error) {
      console.log(result)
      console.log(response)
      res.send('file uploaded')
    }
  })
})

module.exports = router