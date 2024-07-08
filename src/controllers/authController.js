const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwtService = require('../services/jwtService');

const authController = {
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        req.flash('error', 'Usuario no encontrado');
        res.locals.errorMessage = 'Usuario no encontrado';
        return res.redirect(`/auth/login?message=${encodeURIComponent('noexiste')}`);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        req.flash('error', 'Contraseña incorrecta');
        res.locals.errorMessage = 'Contraseña incorrecta';
        return res.redirect(`/auth/login?message=${encodeURIComponent('passmal')}`);
      }

      req.session.userId = user._id;
      const token = await jwtService.generarJWT({ id: user._id, username: username });
      if (token.exito) {
        jwtService.guardarJWTEnCookie(res, token.data);
        console.log("guarde log");
      } else {
        req.flash('error', 'No se pudo guardar el token');
        res.locals.successMessage = 'Login fallido';
        res.redirect('/auth/login');
      }

      req.flash('success', 'Login exitoso');
      res.locals.successMessage = 'Login exitoso';
      return res.redirect(`/?message=${encodeURIComponent('login')}`);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      req.flash('error', 'Error interno del servidor');
      res.locals.errorMessage = 'Error interno del servidor';
      res.redirect('/auth/login');
    }
  },

  registerUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        req.flash('error', 'El nombre de usuario ya está en uso');
        res.locals.errorMessage = 'El nombre de usuario ya está en uso';
        return res.redirect(`/auth/register?message=${encodeURIComponent('repite')}`);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        password: hashedPassword
      });

      await newUser.save();
      req.flash('success', 'Registro exitoso');
      res.locals.successMessage = 'Registro exitoso';
      return res.redirect(`/auth/login?message=${encodeURIComponent('registro')}`);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      req.flash('error', 'Error interno del servidor');
      res.locals.errorMessage = 'Error interno del servidor';
      res.redirect('/auth/register');
    }
  },

  logoutUser: (req, res, message) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Error al cerrar sesión:', err);
        req.flash('error', 'Error interno del servidor');
        res.locals.errorMessage = 'Error interno del servidor';
        res.redirect('/');
      } else {
        res.clearCookie('auth_token');
        if (message == "tokenExp") {
          return res.redirect(`/auth/login?message=${encodeURIComponent(message)}`);
        }
        else
        {
          return res.redirect(`/auth/login?message=${encodeURIComponent('cierra')}`);
        }
      }
    });
  }
};

module.exports = authController;
