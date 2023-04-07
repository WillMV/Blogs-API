'use strict';

module.exports = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('blogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      foreingKey: true,
    },
  }, {
    tableName: 'blog_posts',
    underscored: true,
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User,
      { foreingKey: 'user_id', as: 'user' })
  }

  return blogPost;
}