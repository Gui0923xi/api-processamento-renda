const { formatarRenda } = require('../utils/formatters');

exports.padronizarRenda = (renda) => {
    if (!renda) return { error: "Renda é obrigatória." };

    // Divida os valores por vírgula e processe cada um
    const rendas = renda.split(',').map((item) => item.trim());
    const rendasPadronizadas = rendas.map(formatarRenda);

    return {
        rendaOriginal: rendas,
        rendasPadronizadas
    };
};
