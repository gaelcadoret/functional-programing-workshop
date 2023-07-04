const express = require('express');
const router  = express.Router();

const makeExpressCallback = require('../../../adapters/express');

const { getAll } = require('../../../http/handlers/students');

router.get("/", makeExpressCallback(getAll))

module.exports = router;