const { getFaixaRenda } = require('../utils/formatters');

exports.consolidarFaixas = (req, res) => {
    try {
        const { renda } = req.body;

        if (!renda || typeof renda !== "string") {
            return res.status(400).json({ error: "O campo 'renda' é obrigatório e deve ser uma string separada por vírgulas." });
        }

        const rendas = renda.split(',').map((item) => item.trim());

        const contagem = {};
        const naoIdentificados = [];

        rendas.forEach((renda) => {
            const faixa = getFaixaRenda(renda);
            if (faixa === "não identificado") {
                naoIdentificados.push(renda);
            } else {
                contagem[faixa] = (contagem[faixa] || 0) + 1;
            }
        });

        const resultado = Object.entries(contagem).map(([faixa, quantidade]) => ({
            faixa,
            quantidade
        }));

        res.json({ resultado, naoIdentificados });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Erro interno no servidor. Verifique os logs para mais detalhes." });
    }
};
