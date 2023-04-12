const express = require('express');
const { Post } = require('../controllers');
const { tokenValidate, postValidate } = require('../middlewares');

const router = express.Router();

router.post('/post', tokenValidate, postValidate, Post.insert);

module.exports = router;