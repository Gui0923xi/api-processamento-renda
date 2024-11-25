const express = require('express');
const router = express.Router();
const { consolidarFaixas } = require('../controllers/rendaController');

router.post('/padronizar', consolidarFaixas);

module.exports = router;
