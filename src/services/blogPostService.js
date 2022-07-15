const { BlogPost } = require('../database/models');
const { throwInvalidError } = require('../utils');

const blogPostService = {
  async create(title, content, userId) {
    if (!title || !content) {
      throwInvalidError('Some required fields are missing');
    }
    const newBlogPost = await BlogPost.create({
      title,
      content,
      userId,
      published: new Date(),
      updated: new Date(),
    });
    return newBlogPost;
  },
  async getAll() {
    const allPosts = await BlogPost.findAll();
    return allPosts;
  },
};

module.exports = blogPostService;
