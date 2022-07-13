require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('./database/models');

const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

const app = express();

app.use(express.json());

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
        return res.status(400).json({ message: 'Invalid fields' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
});

app.post('/user', async (req, res) => {
    const { email, displayName, password, image } = req.body;
    if (displayName.lenght < 8) {
        return res.status(400)
        .json({ message: '"displayName" length must be at least 8 characters long' });
    }
    if (!validEmail.test(email)) {
        return res.status(400).json({ message: '"email" must be a valid email' });
    }
    if (password.lenght < 6) {
        return res.status(400)
        .json({ message: '"password" length must be at least 6 characters long' });
    }
    const exist = await User.findOne({ where: { email } });
    if (exist) {
        return res.status(409).json({ message: 'User already registered' });
    }
    const { dataValues } = await User.create({ displayName, email, password, image });
    const token = jwt.sign({ id: dataValues.id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
});

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
