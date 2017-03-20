const Boom = require('boom');

module.exports = (Usuario, credentials, callback) => {
    Usuario
        .findOrCreate({ where: { email: credentials.email } })
        .spread((usuario) => {
            callback(usuario.get({ plain: true }));
        })
        .catch(() => {
            callback(Boom.expectationFailed('Ocurrió un error al obtener el perfil del usuario desde la base de datos.'));
        });
};
