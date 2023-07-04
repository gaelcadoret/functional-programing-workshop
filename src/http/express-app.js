const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const router = require("./routes/expressIndex");

module.exports = () => {
  const app = express();

  app.use(helmet());
  app.use(compression({}));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // middleware that is specific to this router
  // app.use(function timeLog(req, res, next) {
  //   console.log(new Date(), `[${req.method}] ${req.url}`);
  //   next();
  // });

  router(app);

  return app;
};
