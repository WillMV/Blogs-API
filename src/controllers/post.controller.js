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

module.exports = {
  insert,
};