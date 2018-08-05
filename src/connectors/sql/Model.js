import knexConfig from '../../../knexFile';
import Model from './BaseModel';


const environment = process.env.NODE_ENV || 'development';

const knexConfigEnv = knexConfig[environment];

const knex = require('knex')({...knexConfigEnv, debug: false});

Model.knex(knex);

export {Model as default, knexConfigEnv};