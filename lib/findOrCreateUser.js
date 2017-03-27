const Boom = require('boom');

module.exports = (Usuario, credentials) => {
    return Usuario
        .findOrCreate({ where: { email: credentials.email } })
        .spread((usuario) => {
            return usuario.get({ plain: true });
        })
        .catch(() => {
            return Boom.expectationFailed('Ocurrió un error al obtener el perfil del usuario desde la base de datos.');
        });
};
