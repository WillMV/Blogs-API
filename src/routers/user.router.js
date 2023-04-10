const express = require('express');
const { insert, getUsers } = require('../controllers');
const { userValidate, tokenValidate } = require('../middlewares');

const router = express.Router();

router.post('/user', userValidate, insert);
router.get('/user', tokenValidate, getUsers);

module.exports = router;