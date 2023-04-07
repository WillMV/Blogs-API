const express = require('express');
const login = require('./login.router');

const router = express.Router();

router.use(login);

module.exports = router;