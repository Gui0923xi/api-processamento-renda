exports.formatarRenda = (renda) => {
    if (!renda) return "Valor inválido";

    renda = renda.trim().toLowerCase();

    // Regras de substituição
    renda = renda.replace(/até r\$|menor que r\$/g, "0_a_");
    renda = renda.replace(/de r\$|entre r\$/g, "");
    renda = renda.replace(/maior que r\$/g, ">");
    renda = renda.replace(/r\$/g, "");
    renda = renda.replace(/,/g, ".");
    renda = renda.replace(/a r\$| e r\$/g, "_a_");

    // Limpeza final: somente números, "_" e ">"
    return renda.replace(/[^0-9_a_>]/g, "");
};
