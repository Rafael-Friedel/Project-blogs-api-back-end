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
};

module.exports = categoryController;
