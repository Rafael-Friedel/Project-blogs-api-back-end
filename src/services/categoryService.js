const { Category } = require('../database/models');
const {
  //   throwConflictsError,
  throwInvalidError,
  //   throwUnauthorizedError,
  //   throwNotFoundError,
} = require('../utils');

const categoryService = {
  async add(name) {
    if (!name) throwInvalidError('"name" is required');
    const newCategory = await Category.create({ name });
    return newCategory;
  },
};

module.exports = categoryService;
