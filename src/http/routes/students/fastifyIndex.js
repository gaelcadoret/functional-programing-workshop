const makeCallback = require('../../../adapters/fastify');
const routerWrapper = require('../../../adapters/fastifyWrapper');

const { getAll } = require('../../../http/handlers/students');

module.exports = routerWrapper((router, options, next) => {
    router.get('/', makeCallback(getAll));

    next();
});