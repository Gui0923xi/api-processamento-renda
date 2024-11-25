const pool = require('../config/db'); // Importa a conexão com o banco

exports.testarConexao = async (req, res) => {
    try {
        // Tenta estabelecer uma conexão com o banco
        const [rows] = await pool.query('SELECT 1');
        res.json({ sucesso: true, mensagem: "Conexão com o banco bem-sucedida!", resultado: rows });
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
        res.status(500).json({ sucesso: false, mensagem: "Erro ao conectar ao banco de dados.", erro: error.message });
    }
};
