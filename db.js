const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '108.181.92.72',
    user: 'rootadmin',
    password: 'Lyx@2024_db',
    database: 'dados_padronizados',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
