const express = require('express');
const { tokenValidate } = require('../middlewares');
const { Categorys } = require('../controllers');

const router = express.Router();

router.post('/categories', tokenValidate, Categorys.insert);
router.get('/categories', tokenValidate, Categorys.getAll);

module.exports = router;