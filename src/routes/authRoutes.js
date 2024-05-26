const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas para renderizar las vistas de login y registro
router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/register', (req, res) => {
  res.render('auth/register');
});

// Rutas para manejar el login y el registro
router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);
router.get('/logout', authController.logoutUser);

module.exports = router;
