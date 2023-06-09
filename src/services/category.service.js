const { Category } = require('../models');
const { httpErrorGen } = require('../utils');

const insert = async (name) => {
  const hasInDB = await Category.findOne({ where: { name } });
  if (hasInDB) throw httpErrorGen(409, 'Category already registered');
  const newData = await Category.create({ name });
  return newData;
};

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  insert,
  getAll,
};