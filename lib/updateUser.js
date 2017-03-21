const Boom = require('boom');

module.exports = (Usuario, credentials, payload, callback) => {
    Usuario.update({
        nombre: payload.nombre,
        apellido: payload.apellido,
        CURP: payload.CURP,
        rolEscuela: payload.rolEscuela,
        telefono: payload.telefono,
        claveEscuela: payload.claveEscuela,
        nombreEscuela: payload.nombreEscuela,
        regionEscuela: payload.regionEscuela
    }, {
        where: {
            email: credentials.email
        }
    }).spread(() => {
        const usuario = payload;
        usuario.email = credentials.email;
        callback(usuario);
    }).catch(() => {
        callback(Boom.expectationFailed('Ocurrió un error al guardar el perfil de usuario'));
    });
};
