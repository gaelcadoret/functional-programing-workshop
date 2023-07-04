const makeCallback = require('../../adapters/fastify');
const { notFound } = require('../../../src/http/handlers/notFound');
const studentsRoute = require('./students');

module.exports = (fastify, options, next) => {
    fastify.register(studentsRoute, {
        prefix: '/students'
    });

    fastify.get('*', makeCallback(notFound))

    next();
}