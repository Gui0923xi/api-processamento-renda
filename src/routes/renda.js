const express = require('express');
const router = express.Router();

router.post('/padronizar', (req, res) => {
    const renda = req.body.renda;
    // Exemplo de padronização simples
    const rendaPadronizada = renda.toLowerCase().replace(/[^0-9]/g, '');
    res.json({ rendaOriginal: renda, rendaPadronizada });
});

module.exports = router;
