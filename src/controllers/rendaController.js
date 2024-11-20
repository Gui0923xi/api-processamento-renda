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
            naoIdentificados.push(renda); // Adiciona o valor bruto que não foi identificado
        } else {
            contagem[faixa] = (contagem[faixa] || 0) + 1; // Incrementa a contagem das faixas identificadas
        }
    });

    const resultado = Object.entries(contagem).map(([faixa, quantidade]) => ({
        faixa,
        quantidade
    }));

    return { resultado, naoIdentificados };
};
