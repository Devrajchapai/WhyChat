const { model } = require("mongoose");
const User = require("../models/user.model");
const Chat = require("../models/chat.model");
const Message = require("../models/message.model");
const { uniqueID } = require("../../utlis/uniqueidgenerator");

class MessageController {
  listofContact = async (req, res) => {};

  //for private message
  newContact = async (req, res) => {
    const { myEmail, contactEmail } = req.body;
    try {
      if (!myEmail || !contactEmail) {
        return res.status(400).json({
          message: "failed to add new contact",
        });
      }

      const myID = await User.findOne(
        { email: myEmail },
        { _id: 1, username: 1 }
      );
      const contactID = await User.findOne(
        { email: contactEmail },
        { _id: 1, username: 1 }
      );

      if (!myID || !contactID) {
        return res.status(404).json({
          message: `couldn't find user ${contactEmail}`,
        });
      }

      const existingChat = await Chat.findOne({
        isGroupChat: false,
        $and: [
          { participants: { $elemMatch: { $eq: myID._id } } },
          { participants: { $elemMatch: { $eq: contactID._id } } },
        ],
      });

      if (existingChat) {
        return res.status(409).json({
          message: `already connected with ${contactEmail}`,
        });
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
      if (newChat) {
        req.io
          .to(contactID._id.toString())
          .emit(
            "individual-room",
            `you are in private room with ${myID.username}`
          );
        return res.status(200).json({
          message: `private room with ${contactEmail} is created `,
        });
      } else {
        return res.status(500).json({
          message: `failed to create private room with ${contactID.username}. TRY AGAIN !!! `,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "something wentssz. TRY AGAIN !!!",
      });
    }
  };

  //for group message
  createGroup = async (req, res) => {
    const { myEmail, groupName } = req.body;
    try {
      if (!myEmail || !groupName) {
        return res.status(400).json({
          message: "failed to create group",
        });
      }

      const myID = await User.findOne({ email: myEmail }, { _id: 1 });
      if (!myID) {
        return res.status(404).json({
          message: `couldn't find user ${myEmail}`,
        });
      }

      const roomID = uniqueID();

      const chatData = {
        chatName: groupName,
        isGroupChat: true,
        participants: [myID._id],
        roomID: roomID,
        admin: myID._id,
      };

      const newGroup = await Chat.create(chatData);
      if (newGroup) {
        res.status(200).json({
          message: `you create group ${groupName}`,
        });
      } else {
        res.status(500).json({
          message: `failed to create ${groupName}. try again`,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "failed to create new group. TRY AGAIN !!!",
      });
    }
  };

  //in group
  addMembers = async (req, res) => {
    const { email, roomID } = req.body;
    try {
      if (!email || !roomID) {
        return res.status(400).json({
          message: `${email} doesn't exist`,
        });
      }

      const user = await User.findOne(
        { email: email },
        { _id: 1, username: 1 }
      );
      const chat = await Chat.findOne(
        { roomID: roomID },
        { _id: 1, chatName: 1 }
      );

      if (!user || !chat) {
        return res.status(404).json({
          message: "failed to add member",
        });
      }

      const alreadyInGroup = await Chat.findOne({
        _id: chat._id,
        participants: { $in: user._id }, //returns true if user in the group
      });

      if (alreadyInGroup) {
        return res.status(409).json({
          message: `${email} is already a member of this group`,
        });
      }

      if (!alreadyInGroup) {
        await Chat.findOneAndUpdate(
          { _id: chat._id },
          { $push: { participants: user._id } },
          { new: true }
        )
          .then(() => {
            req.io
              .to(user._id.toString())
              .emit(
                "added-new-member-in-group",
                `${user.username} is added to the group ${chat.chatName}`
              );
            return res
              .status(200)
              .json({ message: `${email} is added to the group` });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({ message: "failed to add in group" });
          });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "something went wrong. TRY AGAIN !!!",
      });
    }
  };

  //from group
  removeMember = async (req, res) => {
    const { email, roomID } = req.body;
    try {
      if (!email || !roomID) {
        return res.status(400).json({
          message: `failed to remove member`,
        });
      }

      const user = await User.findOne(
        { email: email },
        { _id: 1, username: 1 }
      );
      const chat = await Chat.findOne(
        { roomID: roomID },
        { _id: 1, chatName: 1 }
      );

      if (!user || !chat) {
        return res.status(400).json({
          message: `failed to remove member`,
        });
      }

      const existingChat = await Chat.findOne(
        {
          _id: chat._id,
          participants: user._id,
        },
        { _id: 1 }
      );

      if (!existingChat) {
        return res.status(404).json({
          message: `${chat.chatName} doesn't have user ${user.username}`,
        });
      }

      if (existingChat) {
        await Chat.findOneAndUpdate(
          { _id: chat._id },
          { $pull: { participants: user._id } },
          { new: true }
        )
          .then(() => {
            req.io
              .to(user._id.toString())
              .emit(
                "removed-from-group",
                `you are removed from ${chat.chatName}`
              );
            return res.status(200).json({
              message: `${user.username} is removed from ${chat.chatName}`,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              message: `failed to remove ${user.username} from ${chat.chatName}`,
            });
          });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "something went wrong. TRY AGAIN !!!",
      });
    }
  };

  storedMessage = async (req, res) => {
    const { email, content, roomID } = req.body; //email is of sender
    try {
      if (!email || !content || !roomID) {
        return res.status(400).json({
          message: "failed to send message",
        });
      }

      const chat = await Chat.findOne({ roomID: roomID }, { _id: 1 });
      const user = await User.findOne({ email: email }, { _id: 1 });

      if (!chat || !user) {
        return res.status(404).json({
          message: "failed to send message",
        });
      }

      const existingChat = await Chat.findOne({
        _id: chat._id,
        participants: user._id,
      });

      if (!existingChat) {
        return res.status(403).json({
          message: `you are not a member of this group`,
        });
      }

      if (existingChat) {
        await Message.create({
          chat: chat._id ,
          sender: user._id, 
          content: content 
      }).then(async (message) => {
            await Chat.findByIdAndUpdate(
              { _id: chat._id },
              { $set: { lastMessage: message._id } }
            );

            const fullMessage = await message.populate("sender", "username avatar")
            req.io.to(roomID).emit("received-message", fullMessage);
            return res.status(200).json({
              message: "message sent successfully",
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "failed to sent message",
            });
          });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "something went wrong. TRY AGAIN !!!",
      });
    }
  };

  retriveMessage = async (req, res) => {};
}
const messageController = new MessageController();
module.exports = messageController;
