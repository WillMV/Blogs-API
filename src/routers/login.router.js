const express = require('express');
const { Users } = require('../controllers');
const { loginValidate } = require('../middlewares');

const router = express.Router();

router.post('/login', loginValidate, Users.login);

module.exports = router;