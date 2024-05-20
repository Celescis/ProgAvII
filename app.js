const express = require('express');
const app = express();
const empleadoRoutes = require('./src/routes/empleadoRoutes');
const sequelize = require('./src/config/conn');
require('dotenv').config();

app.use(express.json());
app.use("/api", empleadoRoutes);

const PORT = process.env.APP_PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log('Conexión a la base de datos establecida');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });