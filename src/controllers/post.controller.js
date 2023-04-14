const { Post } = require('../services');

const insert = async (req, res, next) => {
  try {
    const { body } = req;
    const userId = req.user.id;
    const postData = { ...body, userId };
    await Post.hasCategories(postData);
    const result = await Post.insert(postData);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const findAll = async (_req, res, next) => {
  try {
    const result = await Post.findAll();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = Number(req.user.id);
    const id = Number(req.params.id);
    const { body } = req;
    const result = await Post.update({ userId, id, ...body });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const post = await Post.findById(id);
    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = Number(req.user.id);
    const id = Number(req.params.id);
    await Post.remove(id, userId);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};
const findByTerm = async (req, res, next) => {
  try {
    const { q } = req.query;
    const finder = await Post.findByTerm(q);
    res.status(200).json(finder);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insert,
  findAll,
  update,
  findById,
  remove,
  findByTerm,
};