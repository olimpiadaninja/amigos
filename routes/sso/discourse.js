const Joi = require('joi');
const DiscourseSSO = require('discourse-sso');
const config = require('../../config.js');
const findOrCreateUser = require('../../lib/findOrCreateUser');

const sso = new DiscourseSSO(config.sso.discourse.secret);

module.exports = {
    path: '/sso/discourse',
    method: 'POST',
    handler(request, reply) {
        if(!sso.validate(request.payload.sso, request.payload.sig)) {
            reply(new Error());
        } else {
            findOrCreateUser(request.getDb().getModel('Usuario'), request.auth.credentials)
            .then(
                usuario =>
                    reply(sso.buildLoginString({
                        nonce: sso.getNonce(request.payload.sso),
                        external_id: usuario.uuid,
                        email: usuario.email,
                        // username: usuario.alias,
                        name: `${usuario.nombre || 'Anónimo'} ${usuario.apellido || 'Sin apellido'}`
                    })),
                boom => reply(boom)
            );
        }
    },
    config: {
        description: 'Passwordless discourse sso',
        auth: 'jwt',
        validate: {
            payload: {
                sso: Joi.string().required(),
                sig: Joi.string().required()
            }
        }
    }
};
