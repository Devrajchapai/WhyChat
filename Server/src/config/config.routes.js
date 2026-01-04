const express = require('express');
mainRouter = express.Router();

const authRouter = require('../modules/auth/auth.router')

mainRouter.use('/authRouter',  authRouter)

module.exports = mainRouter;