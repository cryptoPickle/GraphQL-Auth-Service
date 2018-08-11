const config = require('./src/config');
const path = require('path');

/// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: IMPORT END


const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB
} = config;

module.exports = {
  /// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: DEVELOPMENT
  development: {
    client: 'pg',
    connection: {
      database: POSTGRES_DB,
      host: POSTGRES_HOST,
      user: POSTGRES_USER,
      port: POSTGRES_PORT,
      password:POSTGRES_PASSWORD,
      charset: 'utf8'
    },
    debug: false,
    migrations: {tableName: 'migrations'},
    seeds: {directory: './seeds'}
  },
  /// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: PRODUCTION
  production: {
    client: 'pg',
    connection: {
      database: POSTGRES_DB,
      host: POSTGRES_HOST,
      user: POSTGRES_USER,
      port: POSTGRES_PORT,
      password: POSTGRES_PASSWORD,
      charset: 'utf8'
    },
    migrations: {tableName: 'migrations'},
    seeds: {directory: 'seeds'}
  },
  /// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: TESTING
  testing: {
    client: 'pg',
    connection: {
      database: POSTGRES_DB + '_' + process.pid,
      host: POSTGRES_HOST,
      user: POSTGRES_USER,
      port: POSTGRES_PORT,
      password: POSTGRES_PASSWORD,
      charset: 'utf8'
    },
    migrations: {tableName: 'migrations'},
    seeds: {directory: './seeds'}
  }
}