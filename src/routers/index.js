const express = require('express');
const login = require('./login.router');
const user = require('./user.router');

const router = express.Router();

router.use(login);
router.use(user);

module.exports = router;