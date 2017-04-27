const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])
const moment = require('moment')
const Raven = require('raven')
const uuidV4 = require('uuid/v4')

module.exports.register = function(registration) {
  let user = {
    id: uuidV4(),
    email: registration.email,
    password: registration.password,
    first_name: registration.first_name,
    last_name: registration.last_name,
    balance: 1000.00
  }

  if (process.env.NODE_ENV === 'development') {
    user.activated = true
  }

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

module.exports.fetchUserBalance = function(id) {
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