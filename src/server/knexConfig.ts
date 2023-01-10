import "dotenv/config";

interface KnexConfig {
    [key: string]: object;
};
const defaults = {
    client: 'mysql',
    connection: {
      host: 'DB_HOST',
      user: 'DB_USER',
      password: 'DB_PASSWORD',
      database: 'DB_DATABASE'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  };

export const knexConfig: KnexConfig = {
    local: {
      client: 'mysql',
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE
        }
    },
    development: {
        ...defaults,
        debug: true,
        useNullAsDefault: true
    },

    production: {
        ...defaults
    }
}

export const renderPostgresConfig : KnexConfig= {
  local: {
    client: 'pg',
    connection: {
      host : process.env.PG_HOST,
      port : process.env.PG_PORT,
      user : process.env.PG_USERNAME,
      password : process.env.PG_PASS,
      database : process.env.PG_DB,
      ssl: { 
        rejectUnauthorized: false 
      }
    },
    acquireConnectionTimeout: 1000000,
    pool: {
      min: 0,
      max: 5,
      acquireTimeoutMillis: 300000,
      createTimeoutMillis: 300000,
      destroyTimeoutMillis: 300000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis:1000,
      createRetryIntervalMillis: 2000
      },
    debug: false
  }
}