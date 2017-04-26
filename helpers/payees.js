const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])
const Raven = require('raven')
const uuidV4 = require('uuid/v4')

module.exports.addPayee = function (userID, payee) {
  return knex('payees')
  .insert({
    id: uuidV4(),
    user_id: userID,
    nickname: payee.nickname,
    first_name: payee.first_name,
    middle_name: payee.middle_name,
    last_name: payee.last_name,
    phone: payee.phone,
    email: payee.email,
    street: payee.street,
    suburb: payee.suburb,
    city: payee.city,
    postcode: payee.postcode
  })
  .catch((err) => {
    Raven.captureException(err, {
      user: {
        id: userID,
        payee: payee
      }
    })
    console.error('error adding payee', err)
  })
}

module.exports.updatePayee = function (userID, payee) {
  console.log(payee)
  return knex('payees')
  .where({
    user_id: userID,
    id: payee.id
  })
  .update({
    nickname: payee.nickname,
    first_name: payee.first_name,
    middle_name: payee.middle_name,
    last_name: payee.last_name,
    phone: payee.phone,
    email: payee.email,
    street: payee.street,
    suburb: payee.suburb,
    city: payee.city,
    postcode: payee.postcode
  })
  .catch((err) => {
    Raven.captureException(err, {
      user: {
        userID,
        payee
      }
    })
    console.error('error updating payee. check that user id has that payee id', err)
  })
}

module.exports.getUsersPayees = function (userID) {
  return knex('payees')
  .where('user_id', userID)
  .catch((err) => {
    Raven.captureException(err, {
      user: userID
    })
    console.error('error fetching payees', err)
  })
}

module.exports.getPayeeByNickname = function (userID, nickname) {
  return knex('payees')
  .where({
    'user_id': userID,
    'nickname': nickname
  })
  .then(payee => payee[0])
  .catch((err) => {
    Raven.captureException(err, {
      user: {
        userID,
        nickname
      }
    })
    console.error('error fetching payee by nickname', err)
  })
}