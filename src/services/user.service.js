const { User } = require('../models');
const { httpErrorGen } = require('../utils');

const authLogin = async ({ email, password }) => {
  const catchUser = await User.findOne({ where: { email, password } });
  if (!catchUser) throw httpErrorGen(400, 'Invalid fields');
};

const create = async (user) => {
  const hasEmailInDB = await User.findOne({ where: { email: user.email } });
  if (hasEmailInDB) throw httpErrorGen(409, 'User already registered');
  await User.create(user);
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

// const findByEmail = async (email) => {
//   const email = await User.findOne({ where: { email } })
// };

module.exports = {
  authLogin,
  create,
  getAll,
};