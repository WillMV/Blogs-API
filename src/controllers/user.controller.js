const { authLogin, create, getAll } = require('../services');
const { tokenGen } = require('../utils');

const login = async (req, res, next) => {
  try {
    const { body } = req;
    await authLogin(body);
    const token = tokenGen({ email: body.email });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const insert = async (req, res, next) => {
  try {
    const { body } = req;
    await create(body);
    const token = tokenGen({ email: body.email });
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (_req, res, next) => {
  try {
    const users = await getAll(); 
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  insert,
  getUsers,
};