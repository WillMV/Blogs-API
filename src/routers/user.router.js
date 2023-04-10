const express = require('express');
const { insert } = require('../controllers');
const { userValidate } = require('../middlewares');

const router = express.Router();

router.post('/user', userValidate, insert);

module.exports = router;