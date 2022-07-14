const userService = require('./userService');

const myUserController = {
  async getAll(req, res) {
    const token = req.headers.authorization;
    await userService.verifyToken(token);
    const users = await userService.getAll();
    res.status(200).send(users);
  },
  async getById(req, res) {
    const token = req.headers.authorization;
    await userService.verifyToken(token);
    const { id } = req.params;
    const user = await userService.getById(id);
    res.status(200).json(user);
  },
};

module.exports = myUserController;
