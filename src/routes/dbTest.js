const express = require('express');
const router = express.Router();
const { testarConexao } = require('../controllers/dbTestController');

// Rota para testar a conexão com o banco
router.get('/testar-conexao', testarConexao);

module.exports = router;
