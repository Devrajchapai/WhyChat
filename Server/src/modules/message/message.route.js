const express = require('express');
const mainRouter = express.Router();

const messageController = require('./message.controller')

//friends
mainRouter.get('/listofcontact', messageController.listofContact)
mainRouter.post('/newcontact', messageController.newContact);


//message
mainRouter.get('/retrivemessage', messageController.retriveMessage);
mainRouter.post('/storedmessage', messageController.storedMessage)



module.exports = mainRouter;