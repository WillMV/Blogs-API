const express = require('express');
const login = require('./login.router');
const user = require('./user.router');
const category = require('./category.router');
const post = require('./post.router');

const router = express.Router();

router.use(login);
router.use(user);
router.use(category);
router.use(post);

module.exports = router;