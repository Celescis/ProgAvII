const User = require('../models/user');

const userMiddleware = async (req, res, next) => {
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      res.locals.user = user ? { username: user.username } : null;
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  res.locals.messages = req.flash();
  next();
};

module.exports = userMiddleware;
