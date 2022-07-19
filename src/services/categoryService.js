const { Category } = require('../database/models');
const { throwInvalidError } = require('../utils');

const categoryService = {
  async add(name) {
    if (!name) throwInvalidError('"name" is required');
    const newCategory = await Category.create({ name });
    return newCategory;
  },
  async getAll() {
    const categories = await Category.findAll();
    return categories;
  },
  async getByIdIsValid(id) {
    const category = await Category.findByPk(id);
    if (!category) throwInvalidError('"categoryIds" not found');
  },
  async getById(id) {
    const categories = await Category.findAll({ where: id });
    return categories;
  },
};

module.exports = categoryService;
