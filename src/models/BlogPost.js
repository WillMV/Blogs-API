'use strict';

module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
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
    createdAt: {
      type: DataTypes.DATE,
      field: 'published',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated',
    },
  }, {
    tableName: 'blog_posts',
    underscored: true,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      { foreingKey: 'user_id', as: 'user' })
  }

  return BlogPost;
}