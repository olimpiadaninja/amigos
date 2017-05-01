const Boom = require('boom');

module.exports = (Usuario, requestQuery) => {
    const where = {};
    ['nombre', 'apellido', 'email', 'CURP', 'telefono', 'rolEscuela', 'claveEscuela', 'nombreEscuela', 'regionEscuela'].forEach((q) => {
        if(!requestQuery[q] || requestQuery[q] === '') return;
        where[q] = { ilike: requestQuery[q] };
    });

    return Usuario
        .findAndCountAll({
            where,
            limit: requestQuery.limit,
            offset: requestQuery.offset
        })
        .then(result => result)
        .catch(() => {
            throw Boom.expectationFailed('Ocurrió un error al obtener la lista de usuarios desde la base de datos.');
        });
};
