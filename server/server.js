const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000 ;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));


io.on('connection',(socket) => {
    console.log('new user connected !');

   

    socket.emit('newMessage',{
        from : 'parse',
        text : 'hey its me dude whats up !',
        createdAt :123
    })

    socket.on('createMessage',(message)=>{
        console.log('create message ',message);
    });


    socket.on('disconnect',()=>{
        console.log('user disconnected from server. ');
    })
});



server.listen(port, () => {
    console.log('Server is up on port 3000 ');
});