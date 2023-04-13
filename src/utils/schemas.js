const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required().label('displayName'),
  email: Joi.string().email().required().label('email'),
  password: Joi.string().min(6).required().label('password'),
  image: Joi.string().label('image'),
});

const postSchema = Joi.object({
  title: Joi.string().required().label('title'),
  content: Joi.string().required().label('content'),
  categoryIds: Joi.array().required().label('categoryIds'),
});

const postUpdateSchema = Joi.object({
  title: Joi.string().required().label('title'),
  content: Joi.string().required().label('content'),
});

module.exports = {
  userSchema,
  postSchema,
  postUpdateSchema,
};