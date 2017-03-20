const Joi = require('joi');
const JWT = require('jsonwebtoken');
const config = require('../../config.js');
const emailToken = require('../../lib/emailToken');

const TOKEN_TTL = '2h';

module.exports = {
    path: '/users/passwordless',
    method: 'POST',
    handler(request, reply) {
        const options = {
            expiresIn: TOKEN_TTL
        };
        const session = {
            id: 'otp',
            email: request.payload.email
        };
        const token = JWT.sign(session, config.authKey, options);
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
