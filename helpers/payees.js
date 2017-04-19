const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])

const addPayee = (userID, payee) => {
  return knex('payees')
  .insert({ 
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
    console.error('error adding friend', err)
  })
}

const getUsersPayees = (userID) => {
  return knex('payees')
  .where('user_id', userID)
  .catch((err) => {
    console.error('error fetching payees', err)
  })
}

const getPayeeByNickname = (userID, nickname) => {
  return knex('payees')
  .where({
    'user_id': userID,
    'nickname': nickname
  })
  .then(payee => payee[0])
  .catch((err) => {
    console.error('error fetching payee by nickname', err)
  })
}

module.exports = {
  addPayee,
  getUsersPayees,
  getPayeeByNickname
}