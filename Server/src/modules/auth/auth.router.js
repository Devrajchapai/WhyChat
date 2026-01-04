const express = require('express');
const mainRouter = express.Router();
const authController = require('./auth.controller')

mainRouter.post('/signup', authController.signup);
mainRouter.post('/login', authController.login)

module.exports = mainRouter;