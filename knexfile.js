require('dotenv').config()

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DEV_DB,
      user:     process.env.DEV_USER,
      password: process.env.DEV_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: process.env.STAGING_DB,
      user:     process.env.PROD_USER,
      password: process.env.PROD_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: process.env.PROD_DB,
      user:     process.env.PROD_USER,
      password: process.env.PROD_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
