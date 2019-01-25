var socket = io();

socket.on('connect',function(){
    console.log('connected to server !');

    socket.emit('createMessage',{
        from: 'disco',
        text: 'Hi'
    }, function (data) { // This is call back function added to send ACK to the user.
        console.log(data);
    });

});

socket.on('disconect',function(){
    console.log('disconnected from server !');
});


socket.on('newMessage',function(message){
    console.log('New message',message);
});

