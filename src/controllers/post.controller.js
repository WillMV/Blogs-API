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
    const { id } = req.user;
    const { body } = req.body;
    const data = { id, ...body };
    const result = await Post.update(data);
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

module.exports = {
  insert,
  findAll,
  update,
  findById,
};