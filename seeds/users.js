const uuidV4 = require('uuid/v4')

/*

TODO: Change passport_url and address_proofs to point to placeholder Azure blobs

Test passwords are just the usernames hashed w/ 10 salt rounds
(obviously, use strong passwords if you actually register...):

samuel1234 : samuel1234
alicia2345 : alicia2345
alex3456 : alex3456
花42 : 花42
*/

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({ 
          id: uuidV4(),
          username: 'samuel1234',
          password: '$2a$10$vvZvK/g2K.yKig.IeDpqI.X3sZtlYViR8/M48faG9n2idZkNgfhgO',
          first_name: 'Samuel',
          last_name: 'Watts',
          contact_number: '0298775581',
          email: 'SamuelWatts@armyspy.com',
          address: '32 Dunedin-Waitati Road, North Easy Valley, Dunedin, 9010',
          passport_url: 'https://imgkk.com/i/_mhp.gif',
          address_proof: 'https://imgkk.com/i/_mhp.gif',
          accepted_agreement: false
        }),

        knex('users').insert({
          id: uuidV4(),
          username: 'alicia2345',
          password: '$2a$10$cH5TsVe87Eue3zHJ3XKTzu27nRGCfS3f6l1THdjQ3ZF2O7chdjPGq',
          first_name: 'Alicia',
          last_name: 'Ford',
          contact_number: '0262946300',
          email: 'AliciaFord@armyspy.com',
          address: '182 Queen Street, Moturoa, New Plymouth, 4310',
          passport_url: 'https://imgkk.com/i/_mhp.gif',
          address_proof: 'https://imgkk.com/i/_mhp.gif',
          accepted_agreement: true
        }),

        knex('users').insert({
          id: uuidV4(),
          username: 'alex3456',
          password: '$2a$10$X8q8WjPKOUOBTlbrPhnf0OIg893tz1btob3CjYswD0WkdtJ/3nsP6',
          first_name: 'Alexandra',
          last_name: 'Kent',
          contact_number: '0278089047',
          email: 'AlexandraKent@teleworm.us',
          address: '42 Matawha Way, Matapihi, Tauranga, 3110',
          passport_url: 'https://imgkk.com/i/_mhp.gif',
          address_proof: 'https://imgkk.com/i/_mhp.gif',
          accepted_agreement: false
        }),

        knex('users').insert({
          id: uuidV4(),
          username: '花42',
          password: '$2a$10$Ha5Ozg6R9x7qTZxxyESwgOmRxdzF8ZfaCODmw10Iz7nmhcSVJprk6',
          first_name: '花輪',
          last_name: '正男',
          contact_number: '0264561546',
          email: 'Quing1973@dayrep.com',
          address: '95 Leaver Place, Weymouth, Manukau, 2103',
          passport_url: 'https://imgkk.com/i/_mhp.gif',
          address_proof: 'https://imgkk.com/i/_mhp.gif',
          accepted_agreement: true
        })
      ])
    })
}

