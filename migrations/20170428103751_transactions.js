exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('transactions', (table) => {
    table.uuid('id').primary()
    table.string('stripe_id').notNullable()
    table.string('stripe_customer_id').notNullable()
    table.string('stripe_status').notNullable()
    table.uuid('sender').notNullable()
    table.uuid('receiver').notNullable()
    table.string('receiver_account').notNullable()
    table.integer('amount').notNullable()
    table.string('currency').notNullable()
    table.timestamp('created').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('transactions')
}
