const uuidV4 = require('uuid/v4')

// Test passwords are the same as the usernames

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({ 
          id: uuidV4(),
          username: 'jayden1234',
          password: '$2a$10$hafaoDJXt/YLo3XvmMbhNuSZ994M2yaeXFM8Xo15knoEHhRIRaktm',
          first_name: 'Jayden',
          last_name: 'Edgerton',
          contact_number: '0298775581',
          email: 'JaydenEdgerton@armyspy.com',
          street: '129 Edinburgh Street',
          city: 'Feilding',
          postcode: '4702',
          dateofbirth: '1994-04-04',
          driverslicensenumber: 'AB654321',
          driverslicenseversion: '002',
          accepted_agreement: true
        }),

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
          username: 'katie1234',
          password: '$2a$10$y6Of8lflOt.nPnmNLoCv7uZWjIBmUkEja.aDyKEyNm0iTW0Qq2b0O',
          first_name: 'Katie',
          last_name: 'Bice',
          contact_number: '0262946303',
          email: 'KatieBice@armyspy.com',
          street: '36 Sedgebrook Street',
          suburb: 'Putiki',
          city: 'Wanganui',
          postcode: '4500',
          dateofbirth: '1967-04-17',
          driverslicensenumber: 'AB222222',
          driverslicenseversion: '222',
          vehicleregistration: 'VER947',
          accepted_agreement: true
        }),

        knex('users').insert({
          id: uuidV4(),
          username: 'eva1234',
          password: '$2a$10$vM307VxnOM63ZrDUZhQFKubgMeNIToR.HxmOZ3dZwUNVpNcer5E4W',
          first_name: 'Eva',
          middle_name: 'Janine',
          last_name: 'Rofee',
          contact_number: '0262946304',
          email: 'JanineRofee@armyspy.com',
          street: '123 Poplar Road',
          suburb: 'Anytown',
          city: 'Somewhereville',
          postcode: '1234',
          dateofbirth: '1970-01-30',
          driverslicensenumber: 'AB123456',
          driverslicenseversion: '123',
          vehicleregistration: 'AB1234',
          accepted_agreement: true
        })
      ])
    })
}

