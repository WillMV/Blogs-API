const { authLogin } = require('../services');
const { tokenGen } = require('../utils');

module.exports = async (req, res) => {
  try {
    const { body } = req;
    await authLogin(body);
    const token = tokenGen({ email: body.email });
    res.status(200).json({ token });
  } catch ({ status, message }) {
    if (status) return res.status(status).json({ message });
    return res.status(500).json('Internal error');
  }
};