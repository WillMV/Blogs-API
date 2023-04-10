const express = require('express');
const { insert, getUsers, getById } = require('../controllers');
const { userValidate, tokenValidate } = require('../middlewares');

const router = express.Router();

router.post('/user', userValidate, insert);
router.get('/user', tokenValidate, getUsers);
router.get('/user/:id', tokenValidate, getById);

module.exports = router;