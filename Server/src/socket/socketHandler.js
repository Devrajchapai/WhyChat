const userModel = require('../modules/models/user.model');
const chatModel = require('../modules/models/chat.model');
const messageModel = require('../modules/models/message.model')

module.exports = (io)=>{
    io.on('connection', (socket)=>{
        console.log("A user Connected " +  socket.id)

        socket.on("join-room", ()=>{
            socket.join("Z2p30tBe2DWMLLFUiQcvv");
        })
        socket.on("receive-message", ({roomID, msg})=>{
            socket.to(roomID).emit("send-message", msg)
        })

        socket.on('disconnect', ()=>{
            console.log("A user is Disconnected ")
        })
    })
}