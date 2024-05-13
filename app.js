const express = require('express');
const app = express();
const empleadoRoutes = require('./src/routes/empleadoRoutes');
require('dotenv').config();

app.use(express.json());
app.use("/api", empleadoRoutes);

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT} (http://localhost:${PORT})`);
});