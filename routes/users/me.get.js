const signJwt = require('../../lib/signJwt');
const findOrCreateUser = require('../../lib/findOrCreateUser');

module.exports = {
    path: '/users/me',
    method: 'GET',
    handler(request, reply) {
        findOrCreateUser(request.getDb().getModel('Usuario'), request.auth.credentials)
        .then(
            usuario => reply({ usuario, jwt: signJwt(usuario.email, usuario.uuid) }),
            boom => reply(boom)
        );
    },
    config: {
        auth: 'jwt',
        description: 'Get current user details'
    }
};
