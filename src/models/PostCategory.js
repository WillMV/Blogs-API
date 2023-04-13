'use strict';

module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      categoryId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      tableName: 'posts_categories',
      underscored: true,
      timestamps: false,
    },
  );
    PostCategory.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category, {
        as: 'categories',
        through: PostCategory,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      });
      models.Category.belongsToMany(models.BlogPost, {
        as: 'Blog_posts',
        through: PostCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      })
    };
  return PostCategory;
}