const uuidV4 = require('uuid/v4')

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({ id: uuidV4(),first_name: 'Samuel', last_name: 'Watts', contact_number: '(029) 877 5581', email: 'SamuelWatts@armyspy.com', address: '32 Dunedin-Waitati Road, North Easy Valley, Dunedin, 9010', passport_url: 'https://imgkk.com/i/_mhp.gif', address_proof: 'https://imgkk.com/i/_mhp.gif', accepted_agreement: false }),
        knex('users').insert({ id: uuidV4(),first_name: 'Alicia', last_name: 'Ford', contact_number: '(026) 294 6300', email: 'AliciaFord@armyspy.com', address: '182 Queen Street, Moturoa, New Plymouth, 4310', passport_url: 'https://imgkk.com/i/_mhp.gif', address_proof: 'https://imgkk.com/i/_mhp.gif', accepted_agreement: true }),
        knex('users').insert({ id: uuidV4(),first_name: 'Alexandra', last_name: 'Kent', contact_number: '(027) 808 9047', email: 'AlexandraKent@teleworm.us', address: '42 Matawha Way, Matapihi, Tauranga, 3110', passport_url: 'https://imgkk.com/i/_mhp.gif', address_proof: 'https://imgkk.com/i/_mhp.gif', accepted_agreement: false }),
        knex('users').insert({ id: uuidV4(),first_name: '花輪', last_name: '正男', contact_number: '(026) 456 1546', email: 'Quing1973@dayrep.com', address: '95 Leaver Place, Weymouth, Manukau, 2103', passport_url: 'https://imgkk.com/i/_mhp.gif', address_proof: 'https://imgkk.com/i/_mhp.gif', accepted_agreement: true })
      ])
    })
}
