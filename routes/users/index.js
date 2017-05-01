const findUsers = require('../../lib/findUsers');
const hasCapability = require('../../lib/policies/hasCapability');
const Joi = require('joi');

module.exports = {
    path: '/users',
    method: 'GET',
    handler(request, reply) {
        findUsers(request.getDb().getModel('Usuario'), request.query)
        .then(
            r => reply({ found: r.count, amigos: r.rows }),
            boom => reply(boom)
        );
    },
    config: {
        auth: 'jwt',
        description: 'Get all users details',
        plugins: {
            policies: [hasCapability('list_users')]
        },
        validate: {
            query: {
                limit: Joi.number().label('Limit').example(20)
                    .integer()
                    .positive()
                    .max(10000)
                    .default(10),
                offset: Joi.number().label('Offset').example(1000)
                    .integer()
                    .min(0)
                    .default(0),
                nombre: Joi.string().label('Nombre').example('Julio César')
                    .max(80),
                apellido: Joi.string().label('Apellido').example('Álvarez Trejo')
                    .max(80),
                email: Joi.string().label('Correo electrónico').example('nombre@example.org')
                    .lowercase(),
                CURP: Joi.string().label('CURP').example('BADD110313HCMLNS09')
                    .uppercase()
                    .max(18),
                rolEscuela: Joi.string().label('Rol en la escuela').example('participante')
                    .lowercase()
                    .max(31),
                telefono: Joi.number().label('Teléfono de contacto').example('4421111222')
                    .integer()
                    .max(9999999999),
                claveEscuela: Joi.string().label('Clave de escuela').example('22DPR0129A')
                    .uppercase()
                    .max(10),
                nombreEscuela: Joi.string().label('Nombre de la escuela del usuario').example('Enrique Barrera')
                    .max(255),
                regionEscuela: Joi.string().label('Región donde se encuentra la escuela del usuario').example('cadereyta')
                    .lowercase()
                    .max(31)
            }
        }
    }
};
