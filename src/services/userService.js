require('dotenv').config();
const jwt = require('jsonwebtoken');
const { throwConflictsError, throwInvalidError } = require('../utils');
const { User } = require('../database/models');

const userService = {
    async existEmail(email) {   
        const exist = await User.findOne({ where: { email } });
        if (exist) throwConflictsError('User already registered');
        return true;
     },

    async validateUser(email, password) {
        const user = await User.findOne({ where: { email, password } });
        if (!user) throwInvalidError('Invalid fields');
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        return token;
    },
    async validBody(email, password) {
        if (!email || !password) throwInvalidError('Some required fields are missing');
        return true;
    },
    async validEmail(email) {
        const regexEmail = /\S+@\S+\.\S+/;
        if (!regexEmail.test(email))throwInvalidError('"email" must be a valid email');
        return true;
    },
    async validDisplayName(displayName) {
        if (displayName.length < 8) {
            throwInvalidError('"displayName" length must be at least 8 characters long');
        }
        return true;
    },

    async validPassword(password) {
        if (password.length < 6) {
            throwInvalidError('"password" length must be at least 6 characters long');
        }
        return true;
    },
    async createUser(displayName, email, password, image) {
        const { dataValues } = await User.create({ displayName, email, password, image });
        const token = jwt.sign({ id: dataValues.id }, process.env.JWT_SECRET);
        return token;
    },
};

module.exports = userService;