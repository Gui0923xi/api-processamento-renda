const pool = require('../config/db'); // Conexão com o banco de dados
const { getFaixaRenda } = require('../utils/formatters'); // Função de padronização de rendas

exports.atualizarRendas = async (req, res) => {
    try {
        const { dados } = req.body;

        // Validação do corpo da requisição
        if (!dados || !Array.isArray(dados)) {
            console.error("Erro: Dados não fornecidos ou no formato incorreto.");
            return res.status(400).json({ error: "O campo 'dados' é obrigatório e deve ser um array." });
        }

        // Processar cada item na lista de dados
        const dadosAtualizados = await Promise.all(
            dados.map(async (item) => {
                const faixaCorrigida = getFaixaRenda(item.renda); // Processa a renda

                try {
                    // Verifica se o ID e a faixa estão presentes
                    if (!item.id || !faixaCorrigida) {
                        console.error(`Erro: Item inválido - ID=${item.id}, Renda=${item.renda}`);
                        throw new Error("Dados inválidos fornecidos para atualização.");
                    }

                    // Atualizar no banco de dados
                    const [result] = await pool.query(
                        "UPDATE tabela_renda SET renda = ? WHERE id = ?",
                        [faixaCorrigida, item.id]
                    );

                    console.log(
                        `Registro atualizado com sucesso: ID=${item.id}, Renda Antiga=${item.renda}, Nova Renda=${faixaCorrigida}`
                    );

                    return {
                        id: item.id,
                        renda: faixaCorrigida,
                        alterado: result.affectedRows > 0 // Indica se a atualização foi bem-sucedida
                    };
                } catch (err) {
                    console.error(`Erro ao atualizar registro ID=${item.id}:`, err.message);
                    throw err;
                }
            })
        );

        // Retorna os dados atualizados como resposta
        res.json({
            sucesso: true,
            dados: dadosAtualizados
        });
    } catch (error) {
        console.error("Erro geral ao atualizar rendas:", error.message);
        res.status(500).json({ error: "Erro interno no servidor. Verifique os logs para mais detalhes." });
    }
};
