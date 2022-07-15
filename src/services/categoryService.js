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
  async getByIdIsValid(array) {
    if (!array.length) {
      throwInvalidError('Some required fields are missing');
    }
    await Promise.all(
      array.map(async (id) => {
        const category = await Category.findByPk(id);
        if (!category) throwInvalidError('"categoryIds" not found');
      }),
    );
  },
};

module.exports = categoryService;
