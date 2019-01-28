const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/user');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000 ;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();
app.use(express.static(publicPath));
 

io.on('connection',(socket) => {
    console.log('new user connected !');

    socket.on('join',(params,callback) => {
        if(!isRealString(params.name)||!isRealString(params.room)){
           return callback('name and room name required ');
        }
        socket.join(params.room);
        users.removeUser(socket.id); // TO REMOVE USER FROM ANY PREVIOUS ROOM !!


        
       // var bool1 = users.users.find((user)=>user.name.toUpperCase() === params.name.toUpperCase()); // ye try kiya but not working .
      //  var bool2 = users.users.find((user)=>user.room.toUpperCase() === params.room.toUpperCase()); /// ye try kiya but not working .

        ///////////////////////////////////// MY CODE TO CHECK EXIXTING USER IN ANY ROOM OR IF SAME NAME IS USED. /////// REMOVE THIS IF ERROR PERSISTS.. 
        var bool = users.users.find((user)=>{
            if(user.name.toUpperCase() === params.name.toUpperCase()){
                if(user.room.toUpperCase() === params.room.toUpperCase()){
                    return true ;
                } else {
                    return false ;
                } 
            } else {
                return false ;
            }
        });

        if(bool){   //YOU CAN CHANGE IT TO OR CONDITION IF YOU DONT WANT TO ADD USER WITH SAME NAME IN ANY GROUP 
            return callback('user already exists !');
        }

        ///////////////////////////////////// CODE ENDS HERE.///////////////////////////////////////////////////////////////////////// 

        
        users.addUser(socket.id,params.name,params.room);
        socket.to(params.room).emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
       // socket.to(params.room).emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage' ,generateMessage('Admin',`${params.name} has Joined. !`));
        callback();
    });

    
    socket.on('createMessage',(message,callback)=>{
       var user = users.getUser(socket.id);
       if(user && isRealString(message.text)){
        io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
       }
        callback();
    });

    socket.on('createLocationMessage',(coords)=>{
        var user = users.getUser(socket.id);
        if(user){ 
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude, coords.longitude));
        }
    });
    socket.on('disconnect',()=>{
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left !`));
        }
        console.log('user disconnected from server. ');
    });

///////
socket.on('typing',()=>{
    var user = users.getUser(socket.id);
    if(user){
        socket.broadcast.to(user.room).emit('typing',user.name);
    }
});

socket.on('nottyping',()=>{
    var user = users.getUser(socket.id);
    if(user){
        socket.broadcast.to(user.room).emit('nottyping');
    }
});
///////
});



server.listen(port, () => {
    console.log('Server is up on port 3000 ');
});