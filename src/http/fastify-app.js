const fastify = require('fastify')({
  logger: false
});
const cors = require("cors");
const fastifyExpress = require('@fastify/express')
const compression = require("compression");

const logger = require("./middlewares/logger");
const routes = require("./routes/fastifyIndex");

module.exports = async () => {
  console.log('Starting Fastify app...');

  await fastify.register(fastifyExpress);

  fastify.use(compression());
  fastify.use(cors());
  fastify.use((req, res, next) => {
    console.log(new Date(), `middleware 1 [${req.method}] ${req.url}`);
    next();
  });
  fastify.use((req, res, next) => {
    console.log(new Date(), `middleware 2 [${req.method}] ${req.url}`);
    next();
  });

  fastify.register(routes, {
    prefix: '/api'
  });

  return fastify;
};
