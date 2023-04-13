const Sequelize = require('sequelize');
const config = require('../config/config');
const { BlogPost, PostCategory, Category, User } = require('../models');
const { httpErrorGen } = require('../utils');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const hasCategories = async ({ categoryIds }) => {
  const search = categoryIds.map(async (cat) => Category.findOne({ where: { id: cat } }));
  const waitSearch = await Promise.all(search);
  if (waitSearch.includes(null)) throw httpErrorGen(400, 'one or more "categoryIds" not found');
};

const insert = async ({ title, content, categoryIds, userId }) => {
  const result = await sequelize.transaction(async (t) => {
    const post = await BlogPost.create({
      title, content, userId,
    }, { transaction: t });
    const bulkCat = categoryIds.map((catId) => ({
      postId: post.id, categoryId: catId,
    }));
    await PostCategory.bulkCreate(bulkCat, { transaction: t });
    return post;
  });
  return result;
};

const findAll = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: { exclude: ['PostCategory'] } },
    ],

  });
  return result;
};

module.exports = {
  insert,
  findAll,
  hasCategories,
};
