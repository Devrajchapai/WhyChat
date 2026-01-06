require('dotenv').config()
require('./src/config/config.mongoose')

const express = require('express');
const {createServer} = require('node:http');
const {Server} = require('socket.io')


const mainRouter = require('./src/config/config.routes')
const setUpSocket = require('./src/socket/socketHandler');
const errorHandling = require('./src/middleware/error-handling');

const PORT = process.env.EXPRESS_PORT || 3000;

const app = express();

const server = createServer(app);
const io =new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

//to be able to use socket inside of controller
app.use((req,res,next)=>{
    req.io = io;
    next()
})

app.use(express.json())
setUpSocket(io);
app.use(mainRouter)


app.use(errorHandling)

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});