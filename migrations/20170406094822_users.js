exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('users', (table) => {
    table.uuid('id').primary()
    table.float('balance').defaultTo(0.00).notNullable()
    table.string('first_name').notNullable()
    table.string('middle_name')
    table.string('last_name').notNullable()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()

    table.string('street').notNullable()
    table.string('suburb')
    table.string('city').notNullable()
    table.string('postcode').notNullable()
    table.string('country').notNullable()
    table.string('phone').unique()
    
    table.string('passport_first_name').notNullable()
    table.string('passport_middle_name')
    table.string('passport_last_name').notNullable()
    table.date('date_of_birth').notNullable()
    table.string('passport_number').unique().notNullable()
    table.date('passport_expiry_date').notNullable()
    table.string('nationality').notNullable()
    table.string('issuing_country').notNullable()
    
    table.timestamp('join_date').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}
