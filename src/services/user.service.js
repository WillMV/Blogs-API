const { User } = require('../models');
const { httpErrorGen } = require('../utils');

const authLogin = async ({ email, password }) => {
  const catchUser = await User.findOne({ where: { email, password } });
  if (!catchUser) throw httpErrorGen(400, 'Invalid fields');
};

const create = async (user) => {
  const hasEmailInDB = await User.findOne({ where: { email: user.email } })
  if (hasEmailInDB) throw httpErrorGen(409, 'User already registered')
  await User.create(user);
};

module.exports = {
  authLogin,
  create
};