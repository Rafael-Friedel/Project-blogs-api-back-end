const blogPostService = require('../services/blogPostService');
const userService = require('../services/userService');
const categoryService = require('../services/categoryService');
const postCategoriesService = require('../services/postCategoriesService');

const blogPostController = {
  async add(req, res) {
    const token = req.headers.authorization;
    const userId = await userService.verifyToken(token);
    const { title, content, categoryIds } = req.body;
    const newBlog = await blogPostService.create(
      title,
      content,
      userId,
      categoryIds,
    );
    await Promise.all(
      categoryIds.map(async (id) => {
        await categoryService.getByIdIsValid(id);
        await postCategoriesService.create(newBlog.id, id);
      }),
    );

    res.status(201).json(newBlog);
  },
  async getAll(req, res) {
    const token = req.headers.authorization;
    await userService.verifyToken(token);
    const allPosts = await blogPostService.getAll();
    const response = await Promise.all(
      allPosts.map(async (obj) => {
        const newPost = { ...obj.dataValues };
        const user = await userService.getById(obj.userId);
        const categories = await categoryService.getById(obj.id);
        newPost.user = user;
        newPost.categories = categories;
        return newPost;
      }),
    );
    res.status(200).json(response);
  },
};

module.exports = blogPostController;
