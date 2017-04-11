// TODO: Remove passport_url and address_proof when storing as Azure blobs
// TODO: Check pros and cons (if any) of default Knex UUID vs current UUID library
// TODO: Can users onboard without accepting agreement in the first place?

exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', (table) => {
    table.uuid('id').primary()
    table.string('username').unique().notNullable()
    table.string('password').notNullable()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('contact_number').unique().notNullable()
    table.string('email').unique().notNullable()
    table.string('address').unique().notNullable()
    table.timestamp('join_date').defaultTo(knex.fn.now())
    table.boolean('accepted_agreement').notNullable()
    table.string('passport_url')
    table.string('address_proof')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}