const { getFaixaRenda } = require('../utils/formatters');

exports.consolidarFaixas = (renda) => {
    if (!renda || typeof renda !== "string") {
        throw new Error("O formato enviado não é válido. O campo 'renda' deve ser uma string separada por vírgulas.");
    }

    // Dividir a string em um array, eliminando espaços extras
    const rendas = renda.split(',').map((item) => item.trim());

    const contagem = {};
    const naoIdentificados = [];

    rendas.forEach((renda) => {
        const faixa = getFaixaRenda(renda);
        if (faixa === "não identificado") {
            naoIdentificados.push(renda); // Adiciona ao array de não identificados
        } else {
            contagem[faixa] = (contagem[faixa] || 0) + 1; // Incrementa a contagem das faixas
        }
    });

    const resultado = Object.entries(contagem).map(([faixa, quantidade]) => ({
        faixa,
        quantidade
    }));

    return { resultado, naoIdentificados };const formatters = require('../utils/formatters');
const pool = require('../db'); // Conexão ao banco de dados

exports.padronizarRenda = async (req, res) => {
    const { renda, regime_trabalho, dependente } = req.body;

    if (!renda || !Array.isArray(renda)) {
        return res.status(400).json({ error: "O campo 'renda' é obrigatório e deve ser um array." });
    }

    try {
        // Processa e padroniza os dados
        const dadosPadronizados = renda.map((item, index) => ({
            renda_padronizada: formatters.getFaixaRenda(item),
            regime_trabalho_padronizado: regime_trabalho[index],
            dependente_padronizado: dependente[index]
        }));

        // Salva os dados padronizados no banco
        const query = `
            INSERT INTO dados_padronizados (renda_padronizada, regime_trabalho_padronizado, dependente_padronizado)
            VALUES (?, ?, ?)
        `;
        for (const dado of dadosPadronizados) {
            await pool.query(query, [
                dado.renda_padronizada,
                dado.regime_trabalho_padronizado,
                dado.dependente_padronizado
            ]);
        }

        // Retorna os dados padronizados
        res.status(200).json({
            message: "Dados padronizados e salvos com sucesso.",
            dados: dadosPadronizados
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Erro ao processar os dados." });
    }
};

};
