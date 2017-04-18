const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])
const moment = require('moment')
const uuidV4 = require('uuid/v4')

const register = (registration) => {
  let user = {
    id: uuidV4(),
    username: registration.username,
    password: registration.password,
    first_name: registration.first_name,
    last_name: registration.last_name,
    contact_number: registration.phone,
    email: registration.email,
    street: registration.street,
    city: registration.city,
    postcode: registration.postcode,
    dateofbirth: moment(registration.dateofbirth).format('YYYY-MM-DD'),
    accepted_agreement: true
  }

  // Optional fields
  if (registration.middle_name) { user['middle_name'] = registration.middle_name }
  if (registration.suburb) { user['suburb'] = registration.suburb }

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

module.exports = {
  appendIDproof,
  findByUsername,
  findByID,
  register
}