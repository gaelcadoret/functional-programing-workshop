// CommonJs
const fastify = require('fastify')({
    logger: false
})

const routes = require('./routes/fastifyIndex');

fastify.register(routes, {
    prefix: '/api'
});

fastify.listen({ port: 3001 }, (err, address) => {
    if (err) throw err
    // Server is now listening on ${address}
    console.log(`Server is now listening on ${address}`);
})