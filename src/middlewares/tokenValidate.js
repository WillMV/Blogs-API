const { tokenVerify } = require('../utils');
// const {  } = require('../services');

module.exports = (req, res, next) => {
  // const token = req.headers.authorization;
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const decoded = tokenVerify(token);
    req.user = decoded.data;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};