const { verificarFaixaDeRenda } = require('../services/rendaService');

exports.padronizarRenda = (renda) => {
    // Remove espaços, converte para minúsculas e remove caracteres especiais
    let rendaPadronizada = renda
        .trim()
        .toLowerCase()
        .replace(/[^0-9]/g, '');

    // Verificar faixa de renda
    const faixaDeRenda = verificarFaixaDeRenda(rendaPadronizada);

    return { rendaPadronizada, faixaDeRenda };
};
