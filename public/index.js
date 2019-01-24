var socket = io();

socket.on('connect',function(){
    console.log('connected to server !');

    socket.emit('createEmail',{
        to : 'parse',
        text :' hey hi dude ',
    });
});

socket.on('disconect',function(){
    console.log('disconnected from server !');
});


socket.on('newEmail',function(email){
    console.log('New email',email);
});