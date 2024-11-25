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

pool.getConnection((err, connection) => {
    if (err) {
        console.error("Erro ao conectar no banco de dados:", err.message);
    } else {
        console.log("Conexão com o banco de dados bem-sucedida!");
        connection.release();
    }
});
