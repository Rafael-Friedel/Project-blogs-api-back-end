const userService = require('./userService');

const myController = {
  async getAll(req, res) {
    const token = req.headers.authorization;
    await userService.verifyToken(token);
    const users = await userService.getAll();
    res.status(200).send(users);
  },
};

module.exports = myController;
