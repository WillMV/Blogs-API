'use strict';

module.exports = (sequelize, DataTypes) => {
  const PostCategories = sequelize.define(
    'PostCategories',
    {},
    {
      tableName: 'posts_categories',
      underscored: true,
      timestamps: false,
    },
  );
    PostCategories.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category, {
        as: 'blog_posts',
        through: PostCategories,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
      models.Category.belongsToMany(models.BlogPost, {
        as: 'categories',
        through: PostCategories,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      })
    };
  return PostCategories;
}