const Joi = require('joi');
const signJwt = require('../../lib/signJwt');
const emailToken = require('../../lib/emailToken');

module.exports = {
    path: '/users/passwordless',
    method: 'POST',
    handler(request, reply) {
        const token = signJwt(request.payload.email);
        console.log(token);
        emailToken(token, request.payload, reply);
    },
    config: {
        description: 'Passwordless login request',
        validate: {
            payload: {
                email: Joi.string().email().required().lowercase()
            }
        }
    }
};
