const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const config = require('../../config');
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

const findById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: { all: true, attributes: { exclude: ['password'] } },
  });
  if (!post) throw httpErrorGen(404, 'Post does not exist');
  return post;
};

const findAll = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
};

const update = async ({ title, content, id, userId }) => {
  const [response] = await BlogPost.update({ title, content }, { where: { id, userId } });
  if (response === 0) throw httpErrorGen(401, 'Unauthorized user');
  const result = await findById(id);
  return result;
};

const remove = async (id, userId) => {
  const post = await findById(id);
  if (!post) throw httpErrorGen(404, 'Post does not exist');
  if (post.userId !== userId) throw httpErrorGen(401, 'Unauthorized user');
  await BlogPost.destroy({ where: { id } });
};

const findByTerm = async (term) => {
  const finder = await BlogPost.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${term}%`,
          },
        },
        {
          content: {
            [Op.like]: `%${term}%`,
          },
        },
      ],
    },
    include: { all: true, attributes: { exclude: ['password'] } },
  });
  return finder;
};

module.exports = {
  insert,
  findAll,
  hasCategories,
  update,
  findById,
  remove,
  findByTerm,
};
