// 'use server';

import knex from "knex";
import config from '../../knexfile';

export const db = knex(config.development);

// const db = require('knex')({client: 'mysql2'});


    //-----------------------------------------------------------------//
    //                      Unsafe, yet functional                     //
    //                          or was.....                            //
    //-----------------------------------------------------------------//


// export const db = require('knex')(require('../../knexfile').development)


// import dbConfig from '../../knexfile';
// import db from 'knex'

// let cachedConnection: db.Knex<any, unknown[]>;
// export const getDatabaseConnector = () => {
//     if(cachedConnection) {
//         console.log("Cached Connection");
//         return cachedConnection;
//     }
//     const configByEnviroment = dbConfig['development'];
    
//     if(!configByEnviroment){
//         throw new Error(
//             `Failed to get knex configuration for env: ${process.env.NODE_ENV}`
//         );
//     }
//     console.log("New Connection");
//     const connection = db(configByEnviroment);
//     cachedConnection = connection;
//     return connection;
// }


    //-----------------------------------------------------------------//
    //              Tried Caching connection, didnt work               //
    //-----------------------------------------------------------------//
// import db from 'knex';
// import dbConfig from '../../knexfile';

// let cachedConnection: db.Knex<any, unknown[]> | undefined;

// export const getDatabaseConnector = (): db.Knex<any, unknown[]> => {
//   if (cachedConnection) {
//     console.log('Cached Connection');
//     return cachedConnection;
//   }

//   const configByEnvironment = dbConfig['development'];

//   if (!configByEnvironment) {
//     throw new Error(`Failed to get knex configuration for env:${process.env.NODE_ENV}`);
//   }

//   console.log('New Connection');
//   const connection = db(configByEnvironment);
//   cachedConnection = connection;
//   return connection;  

// };

    //-----------------------------------------------------------------//
    //              Tried Error handling, failed miserably             //
    //-----------------------------------------------------------------//

// import dbConfig from '../../knexfile'
// import db from 'knex'

// let connection;

// export const getDatabaseConnector = () =>{
//     return () =>{
//         const configByEnviroment = dbConfig['development'];
//         if(!configByEnviroment){
//             throw new Error(
//                 `Failed to get knex configuration for env: ${process.env.NODE_ENV}`
//             );
//         }
//         connection = db(configByEnviroment);
//         return connection;
//     }
// }
