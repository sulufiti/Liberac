const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])
const moment = require('moment')
const uuidV4 = require('uuid/v4')

module.exports.register = function(registration) {
  let user = {
    id: uuidV4(),
    email: registration.email,
    password: registration.password,
    first_name: registration.first_name,
    last_name: registration.last_name
  }

  return knex('users')
  .insert(user)
}

module.exports.findByUsername = function (username) {
  return knex('users').where('username', username)
  .then((user) => { return user[0] })
}

module.exports.findByID = function (id) {
  return knex('users').where('id', id)
  .then((user) => { return user[0] })
}

module.exports.appendIDproof = function (id, number, expiry) {
  return knex('users')
  .where('id', id)
  .update({
    passport_number: number,
    passport_expiry: moment(expiry).format('YYYY-MM-DD')
  })
}

module.exports.activateUser = function (id) {
  return knex('users')
  .where('id', id)
  .update({
    activated: true
  })
}