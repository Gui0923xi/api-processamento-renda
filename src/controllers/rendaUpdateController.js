const pool = require('../config/db'); // Importa a conexão com o banco de dados
const { getFaixaRenda } = require('../utils/formatters'); // Função para padronizar as rendas

exports.atualizarRendas = async (req, res) => {
    try {
        const { dados } = req.body;

        if (!dados || !Array.isArray(dados)) {
            return res.status(400).json({ error: "O campo 'dados' é obrigatório e deve ser um array." });
        }

        // Processar cada item na lista de dados
        const dadosAtualizados = await Promise.all(
            dados.map(async (item) => {
                const faixaCorrigida = getFaixaRenda(item.renda); // Processa a renda

                // Atualiza no banco de dados
                const [result] = await pool.query(
                    "UPDATE tabela_renda SET renda = ? WHERE id = ?",
                    [faixaCorrigida, item.id]
                );

                return {
                    id: item.id,
                    renda: faixaCorrigida,
                    alterado: result.affectedRows > 0 // Confirma se foi alterado no banco
                };
            })
        );

        // Retorna os dados atualizados como resposta
        res.json({
            sucesso: true,
            dados: dadosAtualizados
        });
    } catch (error) {
        console.error("Erro ao atualizar rendas:", error.message);
        res.status(500).json({ error: "Erro interno no servidor. Verifique os logs para mais detalhes." });
    }
};
