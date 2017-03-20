const findOrCreateUser = require('../../lib/findOrCreateUser');

module.exports = {
    path: '/users/me',
    method: 'GET',
    handler(request, reply) {
        findOrCreateUser(request.auth.credentials, reply);
    },
    config: {
        auth: 'jwt',
        description: 'Get current user details'
    }
};
