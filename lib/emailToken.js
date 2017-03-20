const email = require('emailjs/email');
const Boom = require('boom');
const config = require('../config');
const decodeMimeWord = require('mimelib').decodeMimeWord;

const server = email.server.connect(config.smtp);

module.exports = (token, payload, callback) => {
    const mensaje = ['Éste es tu código personal para conectarte a OMMEB Querétaro:', `${config.jwtRedeemURL(token)}`, 'Atentamente, OMMQro.mx'];
    server.send({
        text: `${mensaje[0]}\n\n\n ${mensaje[1]} \n\n\n ${mensaje[2]}`,
        from: config.smtp_from,
        to: payload.email,
        'reply-to': config.smtp_reply_to,
        subject: 'Código para conectarte a OMMEB Querétaro',
        attachment: [
            { data: `<html><p>${mensaje[0]}<br /><br /><a href="${mensaje[1]}">${mensaje[1]}</a></p><p>${mensaje[2]}</p></html>`, alternative: true }
        ]
    }, (err, message) => {
        if(err) {
            callback(Boom.expectationFailed('Ocurrió un error al intentar enviar el código por email.'));
        } else {
            callback({
                respuesta: `Revisa tu bandeja de entrada, acabamos de enviarte un código por email a ${payload.email}`,
                email: {
                    destinatario: payload.email,
                    asunto: decodeMimeWord(message.header.subject)
                }
            });
        }
    });
};
