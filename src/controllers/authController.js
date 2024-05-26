const bcrypt = require('bcryptjs');
const User = require('../models/user');

//Renderizar login y buscar en la base de datos
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      req.flash('error', 'Usuario no encontrado');
      return res.redirect('/auth/login');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      req.flash('error', 'Contraseña incorrecta');
      return res.redirect('/auth/login');
    }

    req.session.userId = user.id;
    req.flash('success', 'Inicio de sesión exitoso');
    res.redirect('/');
  } catch (error) {
    console.error('Error al autenticar el usuario:', error);
    req.flash('error', 'Error interno del servidor');
    res.redirect('/auth/login');
  }
};

//Renderizar registro y guardar en la base de datos
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username: username } });
    if (existingUser) {
      req.flash('error', 'El usuario ya existe');
      return res.redirect('/auth/register');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: username,
      password: hashedPassword,
    });

    req.flash('success', 'Registro exitoso');
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    req.flash('error', 'Error interno del servidor');
    res.redirect('/auth/register');
  }
};

// Cerrar sesión
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      req.flash('error', 'Error al cerrar sesión');
      return res.redirect('/');
    }
    res.redirect('/');
  });
};

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
};
