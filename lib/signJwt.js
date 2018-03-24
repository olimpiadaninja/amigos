const JWT = require('jsonwebtoken');
const config = require('../config.js');

module.exports = (email, uuid = null) => {
    const options = {
        expiresIn: config.jwtTtl
    };

    const capabilities = [];
    if (config.omni_users.includes(email)) {
        capabilities.push('omni')
    }

    const session = {
        id: 'otp',
        email,
        uuid: uuid || undefined,
        examenId: config.examenId,
        capabilities
    };
    return JWT.sign(session, config.authKey, options);
};
