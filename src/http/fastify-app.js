const fastify = require('fastify')({
  logger: false
});
const cors = require("cors");
const fastifyExpress = require('@fastify/express')
const compression = require("compression");

const logger = require("./middlewares/logger");
const routes = require("./routes/fastifyIndex");

module.exports = async () => {
  await fastify.register(fastifyExpress);

  fastify.use(compression());
  fastify.use(cors());
  fastify.use(logger);

  fastify.register(routes, {
    prefix: '/api'
  });

  return fastify;
};
