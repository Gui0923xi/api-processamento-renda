const { getFaixaRenda } = require('../utils/formatters');

exports.consolidarFaixas = (rendas) => {
    if (!Array.isArray(rendas)) {
        throw new Error("O formato enviado não é válido. O campo 'renda' deve ser um array.");
    }

    const contagem = {};

    rendas.forEach((renda) => {
        const faixa = getFaixaRenda(renda);
        contagem[faixa] = (contagem[faixa] || 0) + 1;
    });

    return Object.entries(contagem).map(([faixa, quantidade]) => ({
        faixa,
        quantidade
    }));
};
