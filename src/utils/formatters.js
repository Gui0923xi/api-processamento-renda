// Lista para armazenar os padrões não identificados
const naoIdentificados = [];

exports.formatarRenda = (renda) => {
    if (!renda) return "não identificado";

    renda = renda.trim().toLowerCase();

    // Regras específicas para formatações conhecidas
    if (/^até r\$2\.800$|^até_r\$2\.800$/.test(renda)) {
        return "Abaixo de R$2.800";
    }

    if (/^de r\$2\.001,00 a r\$2\.400,00$|^entre r\$2\.801 e r\$3\.200$|^r\$2\.801_a_r\$3\.200$/.test(renda)) {
        return "R$2.800 a R$3.200";
    }

    if (/^entre r\$3\.201 e r\$3\.600$|^r\$3\.201_a_r\$3\.600$/.test(renda)) {
        return "R$3.201 a R$3.600";
    }

    if (/^entre r\$3\.601 e r\$4\.000$|^r\$3\.601_a_r\$4\.000$/.test(renda)) {
        return "R$3.601 a R$4.000";
    }

    if (/^maior que r\$4\.000$|^r\$4\.001_a_r\$4\.400$/.test(renda)) {
        return "R$4.000 a R$4.500";
    }

    if (/^r\$4\.401_a_r\$4\.800$|^maior_que_r\$4\.800$/.test(renda)) {
        return "R$4.500 a R$5.000";
    }

    if (/^r\$5\.001_a_r\$6\.000$|^maior_que_r\$5\.000$/.test(renda)) {
        return "Acima de R$5.000";
    }

    if (/^menor_que_r\$2\.800$/.test(renda)) {
        return "Abaixo de R$2.800";
    }

    // Caso nenhum padrão seja identificado
    naoIdentificados.push(renda);
    console.log(`[Não identificado]: ${renda}`);
    return "não identificado";
};

// Exportar a lista de não identificados para o controller
exports.getNaoIdentificados = () => naoIdentificados;
