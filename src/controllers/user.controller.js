const { Users } = require('../services');
const { tokenGen } = require('../utils');

const login = async (req, res, next) => {
  try {
    const { body } = req;
    await Users.authLogin(body);
    const token = tokenGen({ email: body.email });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const insert = async (req, res, next) => {
  try {
    const { body } = req;
    await Users.create(body);
    const token = tokenGen({ email: body.email });
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (_req, res, next) => {
  try {
    const users = await Users.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'id invalido' });
    const user = await Users.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  insert,
  getUsers,
  getById,
};