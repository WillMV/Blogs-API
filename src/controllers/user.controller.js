const { Users } = require('../services');

const login = async (req, res, next) => {
  try {
    const { body } = req;
    const token = await Users.login(body);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const insert = async (req, res, next) => {
  try {
    const { body } = req;
    const token = await Users.create(body);
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

const remove = async (req, res, next) => {
  try {
    const { id } = req.user;
    await Users.remove(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  insert,
  getUsers,
  getById,
  remove,
};