const express = require('express');
const login = require('./login.router');
const user = require('./user.router');
const category = require('./category.router');

const router = express.Router();

router.use(login);
router.use(user);
router.use(category);

module.exports = router;