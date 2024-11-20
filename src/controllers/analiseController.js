exports.processarDetalhes = (req, res) => {
    try {
        const { dados } = req.body;

        if (!dados || !Array.isArray(dados)) {
            return res.status(400).json({ error: "O campo 'dados' é obrigatório e deve ser um array." });
        }

        // Processar os dados agrupados por faixa de renda
        const resultado = {};

        dados.forEach((item) => {
            const faixa = item.renda; // A renda já deve vir corrigida
            const dependente = item.dependente === "Sim" ? 1 : 0; // Converter "Sim/Não" para número
            const regime = item.regime_trabalho;

            if (!resultado[faixa]) {
                resultado[faixa] = {
                    dependentes: 0,
                    regimes: {}
                };
            }

            // Incrementar dependentes
            resultado[faixa].dependentes += dependente;

            // Incrementar regimes de trabalho
            if (!resultado[faixa].regimes[regime]) {
                resultado[faixa].regimes[regime] = 0;
            }
            resultado[faixa].regimes[regime] += 1;
        });

        // Formatar o resultado
        const resposta = Object.entries(resultado).map(([faixa, valores]) => ({
            faixa,
            dependentes: valores.dependentes,
            regimes: valores.regimes
        }));

        res.json(resposta);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Erro interno no servidor." });
    }
};
