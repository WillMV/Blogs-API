const express = require('express');
const { Post } = require('../controllers');
const { tokenValidate, postValidate } = require('../middlewares');

const router = express.Router();

router.post('/post', tokenValidate, postValidate, Post.insert);
router.get('/post', tokenValidate, Post.findAll);

module.exports = router;