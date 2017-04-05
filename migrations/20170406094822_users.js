exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', (table) => {
    table.increments('id').primary()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('contact_number').unique().notNullable()
    table.string('email').unique().notNullable()
    table.string('address').unique().notNullable()
    table.string('passport_url')
    table.string('address_proof')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
