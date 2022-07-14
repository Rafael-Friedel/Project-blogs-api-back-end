require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const authService = {
  async createToken(id) {
    const token = jwt.sign({ data: id }, secret);
    return token;
  },
  async readToken(token) {
    const { data } = jwt.verify(token, secret);
    return data;
  },
};

module.exports = authService;
