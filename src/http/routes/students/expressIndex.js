const express = require('express');
const router  = express.Router();

const makeCallback = require('../../../adapters/express');
const routerWrapper = require('../../../adapters/expressWrapper');

const { getAll } = require('../../../http/handlers/students');

module.exports = routerWrapper(() => {
    router.get("/", makeCallback(getAll))

    return router;
});