const { getFaixaRenda } = require('../utils/formatters');

// Controlador para atualizar as rendas diretamente no banco
exports.atualizarRendas = async (req, res) => {
    try {
        const { dados } = req.body;

        if (!dados || !Array.isArray(dados)) {
            return res.status(400).json({ error: "O campo 'dados' é obrigatório e deve ser um array." });
        }

        // Processar os dados para atualização
        const dadosAtualizados = dados.map((item) => {
            const faixaCorrigida = getFaixaRenda(item.renda); // Processa a faixa de renda
            return {
                ...item,
                renda: faixaCorrigida // Atualiza a renda corrigida diretamente
            };
        });

        // Aqui você pode implementar a lógica para salvar no banco (exemplo abaixo)
        console.log("Dados atualizados no banco:", dadosAtualizados);

        res.json({ sucesso: true, dados: dadosAtualizados });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Erro interno no servidor." });
    }
};
