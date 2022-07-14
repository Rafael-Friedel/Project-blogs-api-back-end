const userService = require('../services/userService');

const userController = {
    async login(req, res) {
        const { email, password } = req.body;
        await userService.validBody(email, password);
        const token = await userService.validateUser(email, password);
        res.status(200).json({ token });
    },
    async createUser(req, res) {
        const { email, displayName, password, image } = req.body;
        await userService.validDisplayName(displayName);
        await userService.validEmail(email);
        await userService.validPassword(password);
        await userService.existEmail(email);
        const token = await userService.createUser(displayName, email, password, image);
        res.status(201).json({ token });
    },
};

module.exports = userController;
