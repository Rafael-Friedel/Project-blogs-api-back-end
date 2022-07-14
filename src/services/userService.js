const userModel = require('../models/userModel');

const userService = {
    async existEmail(email) {
       const exist = await userModel.existEmail(email);
       if (exist) {
        return { message: 'User already registered', code: 409 };
    }
       return { code: 201 };
    },
    async validateUser(email, password){
        const user = await User.findOne({ where: { email, password } });
        return user
    }
}

module.exports = userService;