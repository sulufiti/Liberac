const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])
const moment = require('moment')
const Raven = require('raven')
const uuidV4 = require('uuid/v4')

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
  if (registration.middle_name) { user.middle_name = registration.middle_name })
  if (registration.suburn) { user.suburn = registration.suburn })
  if (registration.passport_middle_name) { user.passport_middle_name = registration.passport_middle_name })


  return knex('users')
  .insert(user)
  .catch((err) => {
    console.error('failed to create user', err)
    Raven.captureException(err)
  })
}

module.exports.findByEmail = function (email) {
  return knex('users')
  .where('email', email)
  .then((user) => { return user[0] })
  .catch((err) => {
    console.err('failed to find email', err)
    Raven.captureException(err)
  })
}

module.exports.findByID = function (id) {
  return knex('users')
  .where('id', id)
  .then((user) => { return user[0] })
  .catch((err) => {
    console.err('failed to find by id', err)
    Raven.captureException(err)
  })
}

module.exports.fetchUserBalance = function (id) {
  return knex('users')
  .where('id', id)
  .then((user) => { return user[0].balance })
  .catch((err) => {
    console.log('failed to fetch user balance', err)
    Raven.captureException(err)
  })
}

module.exports.appendIDproof = function (id, number, expiry) {
  return knex('users')
  .where('id', id)
  .update({
    passport_number: number,
    passport_expiry: moment(expiry).format('YYYY-MM-DD')
  })
  .catch((err) => {
    console.error('failed to append id proof', err)
    Raven.captureException(err)
  })
}

module.exports.activateUser = function (id) {
  return knex('users')
  .where('id', id)
  .update({
    activated: true,
    activation_date: knex.fn.now()
  })
  .catch((err) => {
    console.error('failed to activate user', err)
    Raven.captureException(err)
  })
}
