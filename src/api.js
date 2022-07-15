require('dotenv').config();
const express = require('express');
require('express-async-errors');
const userController = require('./controllers/userControllers');
const handleError = require('./midleware');
const categoryController = require('./controllers/categoryController');

const app = express();

app.use(express.json());

app.post('/login', userController.login);

app.post('/user', userController.createUser);

app.get('/user/:id', userController.getById);

app.get('/user', userController.getAll);

app.post('/categories', categoryController.add);

app.use(handleError);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
