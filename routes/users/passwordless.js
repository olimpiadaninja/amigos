const Joi = require('joi');
const signJwt = require('../../lib/signJwt');
const emailToken = require('../../lib/emailToken');
const emailWithSparkPost = require('../../lib/sendWithSparkPost');

module.exports = {
    path: '/users/passwordless',
    method: 'POST',
    handler(request, reply) {
        const token = signJwt(request.payload.email);
        let ssoURI = `https://login.olimpiada.ninja/#/foro/?onmaps&jwt=${encodeURIComponent(decodeURIComponent(token))}`;

        switch (request.payload.ssoTarget) {
        case 'discourse':
            if(request.payload.sso) ssoURI += `&sso=${encodeURIComponent(decodeURIComponent(request.payload.sso))}`;
            if(request.payload.sig) ssoURI += `&sig=${encodeURIComponent(decodeURIComponent(request.payload.sig))}`;
            emailWithSparkPost(
                'amigos-olimpicos-discourse-sso',
                { ssoURI },
                { email: request.payload.email },
                reply
            );
            break;
        default:
            emailToken(token, request.payload, reply);
        }
    },
    config: {
        description: 'Passwordless login request',
        validate: {
            payload: {
                email: Joi.string().email().required().lowercase(),
                ssoTarget: Joi.string().lowercase().default('self'),
                sso: Joi.string().label('SSO payload').example('AbcDxyZ=')
                    .max(4096),
                sig: Joi.string().label('SSO signature').example('AbcDxyZ=')
                    .max(4096)
            }
        }
    }
};
