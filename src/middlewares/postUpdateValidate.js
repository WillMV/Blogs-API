const { postUpdateSchema } = require('../utils');

module.exports = (req, res, next) => {
  const post = req.body;
  const { error } = postUpdateSchema.validate(post);
  if (error) return res.status(400).json({ message: 'Some required fields are missing' });
  next();
};