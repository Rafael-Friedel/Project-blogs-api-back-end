const blogPostService = require('../services/blogPostService');
const userService = require('../services/userService');
const categoryService = require('../services/categoryService');
const postCategoriesService = require('../services/postCategoriesService');

const blogPostController = {
  async add(req, res) {
    const token = req.headers.authorization;
    const userId = await userService.verifyToken(token);
    const { title, content, categoryIds } = req.body;
    console.log(categoryIds);
    await categoryService.getByIdIsValid(categoryIds);
    const newBlog = await blogPostService.create(title, content, userId);
    await Promise.all(
      categoryIds.map(async (id) => {
        await postCategoriesService.create(newBlog.id, id);
      }),
    );

    res.status(201).json(newBlog);
  },
};

module.exports = blogPostController;
