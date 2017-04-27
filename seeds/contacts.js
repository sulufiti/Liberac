const uuidV4 = require('uuid/v4')

// Test passwords are first_name + 1234 eg; george@bush.com is george1234
exports.seed = function (knex, Promise) {
  return knex('usercontacts').del()
    .then(function () {
      return Promise.all([
        knex('usercontacts').insert({
          id: uuidV4(),
          user_id: '3b7295f3-4800-4ae6-9d4d-9d52bc45ddcf',
          nickname: 'Mum',
          first_name: 'Barbara',
          last_name: 'Bush',
          phone: '555-1234',
          email: 'barbara@bush.com',
          street: '123 Example Street',
          suburb: 'Bush',
          city: 'City',
          postcode: '1234'
        }),

        knex('usercontacts').insert({
          id: uuidV4(),
          user_id: '3b7295f3-4800-4ae6-9d4d-9d52bc45ddcf',
          nickname: 'Dad',
          first_name: 'George',
          middle_name: 'Herbert',
          last_name: 'Bush',
          phone: '555-1234',
          email: 'george.sr@bush.com',
          street: '123 Example Street',
          suburb: 'Bush',
          city: 'City',
          postcode: '1234'
        })
      ])
    })
}