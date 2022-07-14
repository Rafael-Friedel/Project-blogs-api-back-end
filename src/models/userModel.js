const { User } = require('../database/models');

const userModel = {
    async existEmail(email){
       const exist = await User.findOne({ where: { email } });
       return exist;
    },
    async validateUser(email, password){
        const user = await User.findOne({ where: { email, password } });
        return user
    }
}

module.exports = userModel;