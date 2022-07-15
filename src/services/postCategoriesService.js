const { PostCategory } = require('../database/models');

const postCategoriesService = {
  async create(postId, categoryId) {
    const newPost = await PostCategory.create({ postId, categoryId });
    return newPost;
  },
};

module.exports = postCategoriesService;
