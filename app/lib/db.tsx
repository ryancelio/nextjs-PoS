'use server';

// import knex from "knex";
// import config from '../../knexfile.js';

// export const db = knex(config.development);

// const db = require('knex')({client: 'mysql2'});

export const db = require('knex')(require('../../knexfile').development)
