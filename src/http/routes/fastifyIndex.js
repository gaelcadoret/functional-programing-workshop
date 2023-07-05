const makeCallback = require('../../adapters/fastify');
const { notFound } = require('../../../src/http/handlers/notFound');

const studentsRoute = require('./students/fastifyIndex');

module.exports = (router, options, next) => {
    router.register(studentsRoute, {
        prefix: '/students'
    });

    router.get('*', makeCallback(notFound))

    next();
}