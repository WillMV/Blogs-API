const express = require('express');
const { tokenValidate } = require('../middlewares');
const { Categorys } = require('../controllers');

const router = express.Router();

router.post('/categories', tokenValidate, Categorys.insert);

module.exports = router;