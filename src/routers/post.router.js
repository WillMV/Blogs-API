const express = require('express');
const { Post } = require('../controllers');
const { tokenValidate, postValidate, postUpdateValidate } = require('../middlewares');

const router = express.Router();

router.post('/post', tokenValidate, postValidate, Post.insert);
router.get('/post', tokenValidate, Post.findAll);
router.get('/post/search', tokenValidate, Post.findByTerm);
router.get('/post/:id', tokenValidate, Post.findById);
router.put('/post/:id', tokenValidate, postUpdateValidate, Post.update);
router.delete('/post/:id', tokenValidate, Post.remove);

module.exports = router;