const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'segredoreserva';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const tokenGen = (data) => jwt.sign({ data }, secret, jwtConfig);
const tokenVerify = (token) => jwt.verify(token, secret);

module.exports = {
  tokenGen,
  tokenVerify,
};