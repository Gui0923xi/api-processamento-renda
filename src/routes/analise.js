const express = require('express');
const router = express.Router();
const { processarDetalhes } = require('../controllers/analiseController');

// Rota para processar os detalhes por faixa de renda
router.post('/processar-detalhes', processarDetalhes);

module.exports = router;
