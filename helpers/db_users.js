const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])

const findByUsername = (username) => {
  return knex('users').where('username', username)
}

const findByID = (id) => {
  return knex('users').where('id', id)
}

module.exports = {
  findByUsername,
  findByUserID
}