require('dotenv').config()
const express = require('express');
const {createServer} = require('node:http');
const {Server} = require('socket.io')
require('./src/config/config.mongoose')
const mainRouter = require('./src/config/config.routes')


const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const io =new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


app.use(express.json())
app.use(mainRouter)


// io.on("connection", (socket)=>{
//     console.log('a user connected', socket.id)

//     socket.on("sendMesssage", (message)=>{
//         console.log(message)
//         io.emit('receiverMessage', message)
        
//     })

//     socket.on("disconnect", ()=>{
//         console.log('you are disconnected')
//     })
// })


server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});