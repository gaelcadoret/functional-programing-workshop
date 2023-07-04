const { getAll } = require('../../../http/handlers/students');

const makeCallback = require('../../../adapters/fastify');

module.exports = (fastify, options, next) => {
    fastify.get('/', makeCallback(getAll));

    next();
};