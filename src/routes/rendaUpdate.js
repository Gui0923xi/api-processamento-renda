const express = require('express');
const router = express.Router();
const { atualizarRendas } = require('../controllers/rendaUpdateController');

// Rota para atualizar rendas diretamente no banco
router.post('/atualizar-rendas', atualizarRendas);

module.exports = router;
