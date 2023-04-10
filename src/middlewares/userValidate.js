const { userSchema } = require('../utils');

module.exports = (req, res, next) => {
  const user = req.body;
  const { error } = userSchema.validate(user);
  if (error) return res.status(400).json({message: error.message});
  next();
}