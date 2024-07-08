const { obtenerPayloadJWT, ObtenerJWTDeCookie } = require('../services/jwtService');
const { logoutUser } = require('../controllers/authController');

const jwtMiddleware = async (req, res, next) => {
    const token = ObtenerJWTDeCookie(req);
    if (!token) {
        return logoutUser(req, res);
    }

    const { exito, data, error } = await obtenerPayloadJWT(token);
    if (!exito) {
        console.log("Token inválido o expirado: ", error)
        return logoutUser(req, res, "tokenExp");
    }
    req.user = data; 
    next();
};

module.exports = jwtMiddleware;
