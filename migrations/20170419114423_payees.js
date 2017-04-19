exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('payees', (table) => {
    table.uuid('id').primary()
    table.uuid('user_id').notNullable()
    table.string('nickname')
    table.string('first_name').notNullable()
    table.string('middle_name')
    table.string('last_name').notNullable()
    table.string('phone').notNullable()
    table.string('email').unique().notNullable()
    table.string('street').notNullable()
    table.string('suburb')
    table.string('city').notNullable()
    table.string('postcode').notNullable()
    table.timestamp('added').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('payees')
}
