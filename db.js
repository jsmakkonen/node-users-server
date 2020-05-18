const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    user: 'my_user',
    database: 'my_database',
    password: 'root',
    port: 5432
});

module.exports = pool;