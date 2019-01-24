var socket = io();

socket.on('connect',function(){
    console.log('connected to server !');


});

socket.on('disconect',function(){
    console.log('disconnected from server !');
});


socket.on('newMessage',function(message){
    console.log('New message',message);
});