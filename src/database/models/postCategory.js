const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    "PostCategory",
    {
      postId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "BlogPosts",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    { timestamps: false }
  );

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      foreignKey: "categoryId",
      otherKey: "postId",
      as: "posts",
    });
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      foreignKey: "postId",
      otherKey: "categoryId",
      as: "categories",
    });
  };

  return PostCategory;
};

module.exports = PostCategory;
