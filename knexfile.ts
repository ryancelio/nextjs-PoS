import './envConfig.ts'


const config = {
    development: {
        client: 'mysql2',
        connection: {
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
        pool:{min: 0, max: 10}
    }
}
export default config;
