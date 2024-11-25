const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rendaRoutes = require('./src/routes/renda');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api', rendaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
const rendaUpdateRoutes = require('./src/routes/rendaUpdate');
app.use('/api', rendaUpdateRoutes);

const dbTestRoutes = require('./src/routes/dbTest');
app.use('/api', dbTestRoutes);
