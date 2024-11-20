const express = require('express');
const router = express.Router();
const { consolidarFaixas } = require('../controllers/rendaController');

router.post('/padronizar', (req, res) => {
    try {
        const { renda } = req.body;

        if (!renda || !Array.isArray(renda)) {
            return res.status(400).json({ error: "O campo 'renda' é obrigatório e deve ser um array." });
        }

        const resultado = consolidarFaixas(renda);
        res.json({ resultado });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Erro interno no servidor. Verifique os logs para mais detalhes." });
    }
});

module.exports = router;
