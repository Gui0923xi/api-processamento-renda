const mysql = require('mysql2');

// Criar conexão com o banco de dados
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Exportar a conexão para uso nos controladores
module.exports = pool.promise();
