exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('transactions', (table) => {
    table.uuid('id').primary()
    table.uuid('sender').notNullable()
    table.uuid('receiver').notNullable()
    table.timestamp('transaction_time').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('transactions')
}
