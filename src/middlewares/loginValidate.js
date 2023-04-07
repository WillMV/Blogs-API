module.exports = (req, res, next) => {
  const user = req.body;
  if (!user.email || !user.password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  if (user.email.length < 1 || user.password.length < 1) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};
