const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])

const findByUsername = (username) => {
  return knex('users').where('username', username)
  .then((user) => { return user[0] })
}

const findByID = (id) => {
  return knex('users').where('id', id)
}

module.exports = {
  findByUsername,
  findByID
}