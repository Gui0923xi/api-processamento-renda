const { getFaixaRenda } = require('../utils/formatters');

exports.consolidarFaixas = (rendas) => {
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
