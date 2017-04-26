const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])
const moment = require('moment')
const uuidV4 = require('uuid/v4')

module.exports.register = (registration) => {
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

const findByUsername = (username) => {
  return knex('users').where('username', username)
  .then((user) => { return user[0] })
}

const findByID = (id) => {
  return knex('users').where('id', id)
  .then((user) => { return user[0] })
}

const appendIDproof = (id, number, expiry) => {
  return knex('users')
  .where('id', id)
  .update({
    passport_number: number,
    passport_expiry: moment(expiry).format('YYYY-MM-DD')
  })
}

const activateUser = (id) => {
  return knex('users')
  .where('id', id)
  .update({
    activated: true
  })
}

module.exports = {
  appendIDproof,
  activateUser,
  findByUsername,
  findByID
}
