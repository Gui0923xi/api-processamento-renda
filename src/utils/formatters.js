exports.getFaixaRenda = (renda) => {
    if (!renda) return "não identificado";

    renda = renda.trim().toLowerCase();

    // Regras específicas para faixas desejadas e faixas erradas
    if (
        /^até r\$2\.800$|^até_r\$2\.800$|^menor_que_r\$2\.800$|^00 a r\$ 2\.000$|^00 a r\$ 2\.400$|^00 a r\$ 2\.800$|^até r\$ 1\.600$|^até_r\$2\.400$|^de r\$ 1\.601$|^de r\$ 2\.001$|^de r\$ 2\.801$|^renda av\.\s?=\s?r\$2\.350$|^r\$1\s?000$|^até r\$2\.000$|^entre_r\$2\.400_e_r\$2\.800$/.test(renda)
    ) {
        return "Abaixo de R$2.800";
    }

    if (
        /^de r\$2\.801$|^entre r\$2\.801 e r\$3\.200$|^r\$2\.801_a_r\$3\.200$|^00 a r\$ 3\.200$|^de r\$ 2\.401$|^maior_que_r\$2\.800$|^abaixo de r\$3\.200$|^de_r\$2\.800_a_r\$3\.200$/.test(renda)
    ) {
        return "R$2.800 a R$3.200";
    }

    if (
        /^de r\$3\.201$|^entre r\$3\.201 e r\$3\.600$|^r\$3\.201_a_r\$3\.600$|^de r\$ 3\.601$|^menor_que_r\$3\.600$|^r\$3\.200_a_r\$3\.600$|^entre_r\$3\.200_e_r\$3\.600$|^entre_r\$3\.201_e_r\$3\.600$/.test(renda)
    ) {
        return "R$3.201 a R$3.600";
    }

    if (
        /^entre r\$3\.601 e r\$4\.000$|^r\$3\.601_a_r\$4\.000$|^de r\$3\.200 a r\$4\.000$|^00 a r\$ 4\.000$|^maior que r\$3\.600$|^acima_de_r\$3\.600$|^maior_que_r\$3\.600$/.test(renda)
    ) {
        return "R$3.601 a R$4.000";
    }

    if (
        /^r\$4\.001_a_r\$4\.400$|^r\$4\.000 a r\$5\.000$|^de r\$ 4\.001$|^maior que r\$4\.000$|^acima de r\$4\.400$|^r\$4\.001_a_r\$5\.000$|^00 a r\$ 4\.400$/.test(renda)
    ) {
        return "R$4.000 a R$4.500";
    }

    if (
        /^r\$4\.401_a_r\$4\.800$|^maior_que_r\$4\.800$/.test(renda)
    ) {
        return "R$4.500 a R$5.000";
    }

    if (
        /^maior_que_r\$6\.000$|^r\$5\.001_a_r\$6\.000$|^acima de r\$5\.000$/.test(renda)
    ) {
        return "Acima de R$5.000";
    }

    // Caso nenhum padrão seja identificado
    return "não identificado";
};
