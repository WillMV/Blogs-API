const { Categorys } = require('../services');

const insert = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    const result = await Categorys.insert(name);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const categories = await Categorys.getAll();
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insert,
  getAll,
};