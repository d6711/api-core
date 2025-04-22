export default () => ({
    port: process.env.PORT || 3000,
    database: {
        type: process.env.DB_TYPE || 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        name: process.env.DB_NAME || 'db_name',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
    }
});
