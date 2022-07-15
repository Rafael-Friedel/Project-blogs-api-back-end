const categoryService = require('../services/categoryService');
const userService = require('../services/userService');

const categoryController = {
  async add(req, res) {
    const token = req.headers.authorization;
    await userService.verifyToken(token);
    const { name } = req.body;
    const newCategory = await categoryService.add(name);
    res.status(201).json(newCategory);
  },
  async getAll(req, res) {
    const token = req.headers.authorization;
    await userService.verifyToken(token);
    const categories = await categoryService.getAll();
    res.status(200).json(categories);
  },
};

module.exports = categoryController;
