const express = require('express');
const bodyParser = require('body-parser');
const clientRoutes = require('./routes/clients.routes');
const productRoutes = require('./routes/products.routes');

const app = express();
app.use(bodyParser.json());

app.use('/api', clientRoutes);
app.use('/api', productRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
