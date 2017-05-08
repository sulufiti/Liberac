const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])
const azure = require('azure-storage')
const moment = require('moment')
const Raven = require('raven')
const error = require('./error')
const uuidV4 = require('uuid/v4')
const blobService = azure.createBlobService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY)

module.exports.register = function (registration) {
  let user = {
    id: uuidV4(),
    balance: 1000.00,
    first_name: registration.first_name,
    last_name: registration.last_name,
    username: registration.username,
    password: registration.password,
    street: registration.street,
    suburb: registration.suburb,
    city: registration.city,
    postcode: registration.postcode,
    country: registration.country,
    phone: registration.phone,
    passport_first_name: registration.passport_first_name,
    passport_last_name: registration.passport_last_name,
    date_of_birth: registration.date_of_birth,
    passport_number: registration.passport_number,
    passport_expiry_date: registration.passport_expiry_date,
    nationality: registration.nationality,
    issuing_country: registration.issuing_country
  }

  // Optional fields
  if (registration.middle_name) { user.middle_name = registration.middle_name }
  if (registration.suburb) { user.suburb = registration.suburb }
  if (registration.passport_middle_name) { user.passport_middle_name = registration.passport_middle_name }

  return knex('users')
  .returning('id')
  .insert(user)
  .catch((err) => {
    error.capture(err)
  })
}

module.exports.storeDocuments = function (user_id, files) {
  blobService.createBlockBlobFromText('passports', user_id, files.passport_scan.data, (error, result, response) => {
    if (!error) {
      blobService.createBlockBlobFromText('addressproofs', user_id, files.proof_of_address.data, (error, result, response) => {
        if (error) { error.capture(error) }
      })
    } else {
      error.capture(error)
    }
  })
}

module.exports.findByUsername = function (email) {
  return knex('users')
  .where('username', email)
  .then((user) => { return user[0] })
  .catch((err) => {
    error.capture(err)
  })
}

module.exports.findByID = function (id) {
  return knex('users')
  .where('id', id)
  .then((user) => { return user[0] })
  .catch((err) => {
    error.capture(err)
  })
}

module.exports.fetchUserBalance = function (id) {
  return knex('users')
  .where('id', id)
  .then((user) => { return user[0].balance })
  .catch((err) => {
    error.capture(err)
  })
}
