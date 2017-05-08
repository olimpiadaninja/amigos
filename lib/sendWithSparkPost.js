const Boom = require('boom');
const config = require('../config');
const sparkPostTransport = require('nodemailer-sparkpost-transport');

const transporter = sparkPostTransport({ sparkPostApiKey: '5bd530c9e10d5477ea970bc2c7fff7d7ab067cc9' });

module.exports = (templateId, substitutionData, recipient, reply) => {
    transporter.sendWithSparkPost({
        from: config.smtp_from,
        recipients: [{ address: recipient.email, name: recipient.nombre || recipient.email }],
        content: { template_id: templateId },
        substitution_data: substitutionData
    }, (err, info) => {
        if(err) {
            reply(Boom.expectationFailed('Ocurrió un error al intentar enviar el código por email.'));
        } else if(info) {
            reply({
                respuesta: `Revisa tu correo ${recipient.email}`,
                email: {
                    destinatario: recipient.email
                }
            });
        } else {
            reply(Boom.expectationFailed());
        }
    });
};
