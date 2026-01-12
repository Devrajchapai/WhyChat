const userModel = require('../modules/models/user.model');
const chatModel = require('../modules/models/chat.model');
const messageModel = require('../modules/models/message.model')

module.exports = (io)=>{
    io.on('connection', (socket)=>{
        console.log("A user Connected " +  socket.id)

        socket.on("join-room", (roomID)=>{
            socket.join(roomID);
        })

        socket.on('disconnect', ()=>{
            console.log("A user is Disconnected ")
        })
    })
}