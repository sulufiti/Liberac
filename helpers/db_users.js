const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])
const uuidV4 = require('uuid/v4')

const register = (registration) => {
  return knex('users')
  .insert({
    id: uuidV4(),
    username: registration.username,
    password: registration.password,
    first_name: registration.first_name,
    last_name: registration.last_name,
    contact_number: registration.phone,
    email: registration.email,
    address: registration.address, 
    accepted_agreement: true
  })
}

const findByUsername = (username) => {
  return knex('users').where('username', username)
  .then((user) => { return user[0] })
}

const findByID = (id) => {
  return knex('users').where('id', id)
  .then((user) => { return user[0] })
}

module.exports = {
  findByUsername,
  findByID,
  register
}