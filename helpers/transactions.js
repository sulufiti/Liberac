const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])
const Raven = require('raven')
const uuidV4 = require('uuid/v4')

module.exports.updateBalance = function (session) {
  const newBalance = parseFloat(session.user.balance).toFixed(2) - session.transaction.total

  return knex('users')
  .where('id', session.user.id)
  .returning('balance')
  .update('balance', newBalance)
  .catch((err) => {
    console.error('Error updating balance', err)
    Raven.captureException(err, {
      user: {
        activeUser: session.user,
        transaction: session.transaction
      }
    })
  })
}