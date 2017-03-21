const Joi = require('joi');
const updateUser = require('../../lib/updateUser');

module.exports = {
    path: '/users/me',
    method: 'POST',
    handler(request, reply) {
        updateUser(request.getDb().getModel('Usuario'), request.auth.credentials, request.payload, reply);
    },
    config: {
        description: 'Actualizar perfil del usuario actual',
        auth: 'jwt',
        validate: {
            payload: {
                nombre: Joi.string().label('Nombre').example('Julio César')
                    .max(80),
                apellido: Joi.string().label('Apellido').example('Álvarez Trejo')
                    .max(80),
                email: Joi.string().label('Correo electrónico').example('nombre@example.org')
                    .email()
                    .lowercase(),
                CURP: Joi.string().label('CURP').example('BADD110313HCMLNS09')
                    .uppercase()
                    .length(18),
                rolEscuela: Joi.string().label('Rol en la escuela').example('participante')
                    .lowercase()
                    .max(31),
                telefono: Joi.number().label('Teléfono de contacto').example('4421111222')
                    .integer()
                    .min(1000000000)
                    .max(9999999999),
                claveEscuela: Joi.string().label('Clave de escuela').example('22DPR0129A')
                    .uppercase()
                    .length(10),
                nombreEscuela: Joi.string().label('Nombre de la escuela del usuario').example('Enrique Barrera')
                    .max(255),
                regionEscuela: Joi.string().label('Región donde se encuentra la escuela del usuario').example('cadereyta')
                    .lowercase()
                    .max(31)
            }
        }
    }
};
