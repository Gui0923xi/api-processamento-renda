const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());

// Aumentar limite do body-parser para 30MB
app.use(bodyParser.json({ limit: '30mb' })); // Limite ajustado para 30MB
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// Rotas
app.use('/renda', require('./src/routes/renda')); // Rota existente
app.use('/analise', require('./src/routes/analise')); // Nova rota adicionada

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
