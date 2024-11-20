const { formatarRenda, getNaoIdentificados } = require('../utils/formatters');

exports.padronizarRenda = (renda) => {
    if (!renda) return { error: "Renda é obrigatória." };

    const rendas = renda.split(',').map((item) => item.trim());
    const rendasPadronizadas = rendas.map(formatarRenda);

    return {
        rendaOriginal: rendas,
        rendasPadronizadas,
        naoIdentificados: getNaoIdentificados()
    };
};
