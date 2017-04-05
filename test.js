const Knex = require('knex')
const knexConfig = require('./knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])

knex('users')
.then((users) => {
  for (user of users) {
    console.log('person', user)
  }
})
.then(() => {
  knex.disconnect()
})
.catch((err) => {
  console.log(err)
})