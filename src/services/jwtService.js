const { SignJWT, jwtVerify } = require('jose');

const jwtKey = String(process.env.JWT_PRIVATE_KEY);

const generarJWT = async ({ id, username }) => {
    try {
        if (!id) { throw new Error('No esta el id del usuario'); }
        if (!username) { throw new Error('No existe ese usuario'); }

        const jwtConstructor = new SignJWT({ id, username });
        const encoder = new TextEncoder();
        const jwt = await jwtConstructor
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("10m")
            .sign(encoder.encode(jwtKey));
            console.log('JWT generado:', jwt);
        return { data: jwt,  exito: true };
    } catch (error) {
        return {  exito: false, error };
    }
};

const obtenerPayloadJWT = async (token) => {
    try {
        const encoder = new TextEncoder();
        const { payload } = await jwtVerify(token, encoder.encode(jwtKey));
        return { exito: true, data: payload };
    } catch (error) {
        return { exito: false, error };
    }
};

const guardarJWTEnCookie = (res, token) => {
    res.cookie('auth_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });
};

const ObtenerJWTDeCookie = (req) => {
    const token = req.cookies.auth_token;
    return token || '';
};

module.exports = {
    generarJWT,
    obtenerPayloadJWT,
    guardarJWTEnCookie,
    ObtenerJWTDeCookie
};