const express = require('express');
const { Users } = require('../controllers');
const { userValidate, tokenValidate } = require('../middlewares');

const router = express.Router();

router.post('/user', userValidate, Users.insert);
router.get('/user', tokenValidate, Users.getUsers);
router.get('/user/:id', tokenValidate, Users.getById);
router.delete('/user/me', tokenValidate, Users.remove);

module.exports = router;