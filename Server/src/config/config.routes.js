const express = require('express');
mainRouter = express.Router();

const authRouter = require('../modules/auth/auth.router');
const messageRouter = require('../modules/message/message.route')

mainRouter.use('/authRouter',  authRouter)
mainRouter.use('/message', messageRouter)

module.exports = mainRouter;