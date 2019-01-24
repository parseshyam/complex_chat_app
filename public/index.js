var socket = io();

socket.on('connect',()=>{
    console.log('connected to server !');
});

socket.on('disconect',() =>{
    console.log('disconnected from server !');
});