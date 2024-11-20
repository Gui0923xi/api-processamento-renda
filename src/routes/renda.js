const express = require('express');
const router = express.Router();
const { padronizarRenda } = require('../controllers/rendaController');

router.post('/padronizar', (req, res) => {
    const renda = req.body.renda;
    if (!renda) {
        return res.status(400).json({ error: 'Renda é obrigatória.' });
    }
    const resultado = padronizarRenda(renda);
    res.json(resultado);
});

module.exports = router;
