const express = require('express');
const { login } = require('../controllers');
const { loginValidate } = require('../middlewares');

const router = express.Router();

router.post('/login', loginValidate, login);

module.exports = router;