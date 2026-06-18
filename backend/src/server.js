require('dotenv').config();

const app = require('./app');
const conectarDB = require('./config/conexionDB');

const PORT = process.env.PORT || 4000;

conectarDB();

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});