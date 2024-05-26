const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./src/config/conn');
const Empleado = require('./src/models/empleado');
const empleadoRoutes = require('./src/routes/empleadoRoutes');
const authRoutes = require('./src/routes/authRoutes');
const userMiddleware = require('./src/middlewares/userMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Middleware para manejar JSON y formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar express-session
app.use(session({
  secret: process.env.APP_PASS,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Configurar express-flash
app.use(flash());

// Usar el middleware de usuario
app.use(userMiddleware);

// Configurar el directorio de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Rutas
app.use("/empleado", empleadoRoutes);
app.use("/auth", authRoutes);
app.get('/', async (req, res) => {
  try {
    const empleados = await Empleado.findAll();
    res.render('home', { empleados });
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    res.status(500).send('Error interno del servidor');
  }
});

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
