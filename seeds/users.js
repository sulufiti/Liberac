// Test passwords are first_name + 1234 eg; george@bush.com is george1234
exports.seed = function (knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          id: '3b7295f3-4800-4ae6-9d4d-9d52bc45ddcf',
          balance: 1234.56,
          first_name: 'George',
          middle_name: 'Walker',
          last_name: 'Bush',
          username: 'george@bush.com',
          password: '$2a$10$s3El2HAbmTP1fB72kEXms.HbhDJ31kydURuqHqAnoz/cYzmWamGB2',
          street: '7 Dixon Street',
          suburb: '',
          city: 'Wellington',
          postcode: '1234',
          country: 'New Zealand',
          phone: '0212345678',
          passport_first_name: 'George',
          passport_middle_name: 'Walker',
          passport_last_name: 'Bush',
          date_of_birth: '1970-01-01',
          passport_number: 'EU1234567',
          passport_expiry_date: '2020-01-01',
          nationality: 'NZEU',
          issuing_country: 'NZ'
        })
      ])
    })
}
