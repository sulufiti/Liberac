exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('friends', (table) => {
    table.increments('id').primary()
    table.uuid('user_a').notNullable()
    table.uuid('user_b').notNullable()
    table.boolean('confirmed').defaultTo(false)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('friends')
}
