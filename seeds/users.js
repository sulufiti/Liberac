// Test passwords are first_name + 1234 eg; george@bush.com is george1234
exports.seed = function (knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          id: '0c57c10c-cc23-4a4b-a339-3edcd42d119e',
          email: 'steve@smith.com',
          password: '$2a$10$fZz7SR8q4CK67CJQ1zeuduvL2Pm9uB3fO8JxlorjWixpeZ5cNeVZC',
          first_name: 'Steve',
          last_name: 'Smith'
        }),

        knex('users').insert({
          id: '3b7295f3-4800-4ae6-9d4d-9d52bc45ddcf',
          email: 'george@bush.com',
          password: '$2a$10$s3El2HAbmTP1fB72kEXms.HbhDJ31kydURuqHqAnoz/cYzmWamGB2',
          balance: 1234.56,
          first_name: 'George',
          last_name: 'Bush',
          activated: true
        })
      ])
    })
}
