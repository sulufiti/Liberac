const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])

const addFriend = (userID, friendID) => {
  return knex('friends')
  .returning('accepted')
  .insert({ user_a: userID, user_b: friendID })
  .catch((err) => {
    console.error('error adding friend', err)
  })
}

module.exports = {
  addFriend
}