exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', (table) => {
    table.uuid('id').primary()
    table.string('username').unique().notNullable()
    table.string('password').notNullable()
    table.float('balance').defaultTo(0.00).notNullable()
    table.string('first_name').notNullable()
    table.string('middle_name')
    table.string('last_name').notNullable()
    table.string('contact_number').unique().notNullable()
    table.string('email').unique().notNullable()
    table.string('street').notNullable()
    table.string('suburb')
    table.string('city').notNullable()
    table.string('postcode').notNullable()
    table.string('dateofbirth').notNullable()
    table.string('passport_number').unique()
    table.string('passport_expiry')
    table.timestamp('join_date').defaultTo(knex.fn.now())
    table.boolean('verified').defaultTo(false).notNullable()
    table.boolean('accepted_agreement').notNullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}
