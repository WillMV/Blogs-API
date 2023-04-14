const { User } = require('../models');
const { httpErrorGen } = require('../utils');
const { tokenGen } = require('../utils');

const login = async ({ email, password }) => {
  const catchUser = await User.findOne({ where: { email, password } });
  if (!catchUser) throw httpErrorGen(400, 'Invalid fields');
  const token = tokenGen({ id: catchUser.id });
  return token;
};

const create = async (user) => {
  const hasEmailInDB = await User.findOne({ where: { email: user.email } });
  if (hasEmailInDB) throw httpErrorGen(409, 'User already registered');
  const u = await User.create(user);
  const token = tokenGen({ id: u.id });
  return token;
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

const findById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) throw httpErrorGen(404, 'User does not exist');
  return user;
};

const remove = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  login,
  create,
  getAll,
  findById,
  remove,
};