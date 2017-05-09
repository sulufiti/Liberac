exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('contact', (table) => {
    table.increments('id').primary()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('email').notNullable()
    table.timestamp('received').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('contact')
}
