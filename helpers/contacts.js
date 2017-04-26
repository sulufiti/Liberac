const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])
const Raven = require('raven')
const uuidV4 = require('uuid/v4')

module.exports.addContact = function (userID, contact) {
  return knex('contacts')
  .insert({
    id: uuidV4(),
    user_id: userID,
    nickname: contact.nickname,
    first_name: contact.first_name,
    middle_name: contact.middle_name,
    last_name: contact.last_name,
    phone: contact.phone,
    email: contact.email,
    street: contact.street,
    suburb: contact.suburb,
    city: contact.city,
    postcode: contact.postcode
  })
  .catch((err) => {
    Raven.captureException(err, {
      user: {
        id: userID,
        contact: contact
      }
    })
    console.error('error adding contact', err)
  })
}

module.exports.updateContact = function (userID, contact) {
  console.log(contact)
  return knex('contacts')
  .where({
    user_id: userID,
    id: contact.id
  })
  .update({
    nickname: contact.nickname,
    first_name: contact.first_name,
    middle_name: contact.middle_name,
    last_name: contact.last_name,
    phone: contact.phone,
    email: contact.email,
    street: contact.street,
    suburb: contact.suburb,
    city: contact.city,
    postcode: contact.postcode
  })
  .catch((err) => {
    Raven.captureException(err, {
      user: {
        userID,
        contact
      }
    })
    console.error('error updating contact. check that user id has that contact id', err)
  })
}

module.exports.getUsersContacts = function (userID) {
  return knex('contacts')
  .where('user_id', userID)
  .catch((err) => {
    Raven.captureException(err, {
      user: userID
    })
    console.error('error fetching contacts', err)
  })
}

module.exports.getContactByNickname = function (userID, nickname) {
  return knex('contacts')
  .where({
    'user_id': userID,
    'nickname': nickname
  })
  .then(contact => contact[0])
  .catch((err) => {
    Raven.captureException(err, {
      user: {
        userID,
        nickname
      }
    })
    console.error('error fetching contact by nickname', err)
  })
}