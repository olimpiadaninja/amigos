const JWT = require('jsonwebtoken');
const config = require('../config.js');

module.exports = (email, uuid = null) => {
    const options = {
        expiresIn: config.jwtTtl
    };
    const session = {
        id: 'otp',
        email,
        uuid: uuid || undefined,
        examenId: config.examenId
    };
    return JWT.sign(session, config.authKey, options);
};
