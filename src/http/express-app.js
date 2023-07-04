const compression = require("compression");
const cors = require("cors");
const express = require("express");
// const helmet = require("helmet");

const logger = require("./middlewares/logger");
const router = require("./routes/expressIndex");

module.exports = () => {
  const app = express();

  // app.use(helmet());
  app.use(compression({}));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(logger);

  router(app);

  return app;
};
