const uuidV4 = require('uuid/v4')

// Test passwords are the same as the usernames

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          id: uuidV4(),
          username: 'steve1234',
          password: '$2a$10$fZz7SR8q4CK67CJQ1zeuduvL2Pm9uB3fO8JxlorjWixpeZ5cNeVZC',
          first_name: 'Steve',
          middle_name: 'Ashley',
          last_name: 'Smith',
          contact_number: '0262946302',
          email: 'SteveSmith@armyspy.com',
          street: 'Flat 3, 12 Albert Street',
          suburb: 'Otahuhu',
          city: 'Auckland',
          postcode: '1062',
          dateofbirth: '1994-01-12',
          passportnumber: 'PP888777',
          passportexpiry: '2017-02-22',
          accepted_agreement: true
        }),

        knex('users').insert({
          id: uuidV4(),
          username: 'george1234',
          password: '$2a$10$s3El2HAbmTP1fB72kEXms.HbhDJ31kydURuqHqAnoz/cYzmWamGB2',
          balance: 1234.56,
          first_name: 'George',
          middle_name: 'Walker',
          last_name: 'Bush',
          contact_number: '0212345678',
          email: 'George@expresident.org',
          street: '1600 Clintons Road',
          suburb: 'RD1',
          city: 'Darfield',
          postcode: '7571',
          dateofbirth: '1946-07-06',
          passportnumber: 'US112233',
          passportexpiry: '2020-02-20',
          accepted_agreement: true
        })
      ])
    })
}

