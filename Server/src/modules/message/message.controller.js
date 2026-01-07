const { model } = require("mongoose");
const User = require('../models/user.model');
const Chat = require('../models/chat.model');
const Message = require('../models/message.model');
const {uniqueID} = require('../../utlis/uniqueidgenerator');

class MessageController{

    listofContact = async(req, res) =>{
      
    }

    //for private message
    newContact = async(req, res)=>{
        const {myEmail, contactEmail} = req.body;
        try{
            if(!myEmail || !contactEmail){
                return  res.status(400).json({
                            message: 'failed to add new contact'
                        })
            }

            const myID = await User.findOne({email: myEmail}, {_id:1});
            const contactID = await User.findOne({email: contactEmail}, {_id:1});
            

            if(!myID || !contactID){
                return res.status(404).json({
                    message: `couldn't find user ${contactEmail}`
                })
            }

            console.log("myId: " + myID._id);
            console.log("contactID: " + contactID._id);

            const existingChat = await Chat.findOne({
                isGroupChat: false,
                $and:[
                    {participants: {$elemMatch: {$eq: myID._id}}},
                    {participants: {$elemMatch: {$eq: contactID._id}}}
                ]
            });
            

            if(existingChat){
                return res.status(409).json({
                    message: `already connected with ${contactEmail}`
                })
            }

            //unique id for socket
            const roomID = uniqueID();

            const chatData = {
                chatName: null,
                isGroupChat: false,
                participants: [myID._id, contactID._id],
                roomID: roomID,
            };
            
            const newChat = await Chat.create(chatData);
            if(newChat){
                req.io.to(roomID).emit("private-room-created", "you are in private room ...");
                return res.status(200).json({
                    message: `private room with ${contactEmail} is created `
                })
            }else{
                return res.status(500).json({
                    message: `failed to create private room with ${contactEmail}. TRY AGAIN !!! `
                })
            }

        }catch(err){
            console.log(err);
            res.status(500).json({
                message: 'failed to add new contact. TRY AGAIN !!!'
            })
        }
    }

    //for group message
    newGroup = async(req, res)=>{

    }
   
    storedMessage = async(req, res)=>{
        
    }

    retriveMessage = async(req, res)=>{

    }

}
const messageController = new MessageController();
module.exports = messageController;