const Joi = require('joi');
const updateUser = require('../../lib/updateUser');

module.exports = {
    path: '/users/me',
    method: 'POST',
    handler(request, reply) {
        updateUser(request.auth.credentials, request.payload, reply);
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
                telefono: Joi.number().label('Teléfono de contacto').example('4421111222')
                    .integer()
                    .min(1000000000)
                    .max(9999999999)
            }
        }
    }
};
