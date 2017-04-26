exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('users', (table) => {
    table.uuid('id').primary()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.float('balance').defaultTo(0.00).notNullable()
    table.string('first_name').notNullable()
    table.string('middle_name')
    table.string('last_name').notNullable()
    table.string('phone').unique()
    table.string('street')
    table.string('suburb')
    table.string('city')
    table.string('postcode')
    table.string('dateofbirth')
    table.string('passport_number').unique()
    table.string('passport_expiry')
    table.timestamp('join_date').defaultTo(knex.fn.now())
    table.boolean('activated').defaultTo(false).notNullable()
    table.timestamp('activation_date')
    table.boolean('verified').defaultTo(false).notNullable()
    table.timestamp('verification_date')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}
