const express = require('express');
const mainRouter = express.Router();

const messageController = require('./message.controller')

//on contact
mainRouter.get('/listofcontact', messageController.listofContact)


//for group
mainRouter.post('/creategroup', messageController.createGroup);
mainRouter.put('/addmember', messageController.addMembers)
mainRouter.delete('/removemember', messageController.removeMember);


//for private
mainRouter.post('/newcontact', messageController.newContact)


//message
mainRouter.get('/retrivemessage', messageController.retriveMessage);
mainRouter.put('/storedmessage', messageController.storedMessage)



module.exports = mainRouter;