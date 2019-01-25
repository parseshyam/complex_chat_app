var socket = io();

socket.on('connect',function(){
    console.log('connected to server !');


});

socket.on('disconect',function(){
    console.log('disconnected from server !');
});


socket.on('newMessage',function(message){
    console.log('New message',message);
    var li = jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from : 'user',
        text : jQuery('[name=message]').val()
    },function(){
        // CALL BACK MESSAGE.
    });
});