const { Router } = require("express");

const makeCallback = require('../../adapters/express');
const { notFound } = require('../../../src/http/handlers/notFound');

const studentRoutes = require('./students/expressIndex');

module.exports = (app) => {
    const router = Router({ mergeParams: true });

    router.use("/students", studentRoutes);

    router.all("*", makeCallback(notFound));

    app.use("/api", router);
};
