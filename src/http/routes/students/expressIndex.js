const express = require('express');
const router  = express.Router();

const makeCallback = require('../../../adapters/express');

const { getAll } = require('../../../http/handlers/students');

router.get("/", makeCallback(getAll))

module.exports = router;