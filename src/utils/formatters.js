exports.getFaixaRenda = (renda) => {
    if (!renda) return "não identificado";

    renda = renda.trim().toLowerCase();

    // Faixas desejadas com regras para os valores errados
    if (
        /^00 a r\$ 2\.000$|^00 a r\$ 2\.400$|^00 a r\$ 2\.800$|^até r\$ 1\.600$|^até_r\$2\.400$|^de r\$ 1\.601$|^de r\$ 2\.001$|^menor_que_r\$2\.000$|^renda av\.\s?=\s?r\$2\.350$|^r\$1\s?000$/.test(renda)
    ) {
        return "Abaixo de R$2.800";
    }

    if (
        /^00 a r\$ 3\.200$|^de r\$ 2\.401$|^de r\$ 2\.801$|^maior_que_r\$2\.800$|^abaixo de r\$3\.200$/.test(renda)
    ) {
        return "R$2.800 a R$3.200";
    }

    if (
        /^de r\$ 3\.601$|^menor_que_r\$3\.600$|^r\$3\.200_a_r\$3\.600$/.test(renda)
    ) {
        return "R$3.201 a R$3.600";
    }

    if (
        /^de r\$3\.200 a r\$4\.000$|^00 a r\$ 4\.000$/.test(renda)
    ) {
        return "R$3.601 a R$4.000";
    }

    if (
        /^r\$4\.000 a r\$5\.000$|^de r\$ 4\.001$/.test(renda)
    ) {
        return "R$4.000 a R$4.500";
    }

    if (/^r\$4\.001_a_r\$5\.000$/.test(renda)) {
        return "R$4.500 a R$5.000";
    }

    if (
        /^acima de r\$ 4\.400$|^maior_que_r\$4\.000$|^maior_que_r\$6\.000$/.test(renda)
    ) {
        return "Acima de R$5.000";
    }

    // Caso nenhum padrão seja identificado
    return "não identificado";
};
