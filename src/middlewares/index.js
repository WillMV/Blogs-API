const loginValidate = require('./loginValidate');
const handleError = require('./handleError');
const userValidate = require('./userValidate');
const tokenValidate = require('./tokenValidate');
const postValidate = require('./postValidate');
const postUpdateValidate = require('./postUpdateValidate');

module.exports = {
  loginValidate,
  handleError,
  userValidate,
  tokenValidate,
  postValidate,
  postUpdateValidate,
};