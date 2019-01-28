var socket = io();

function scrollToBottom(){
     var messages = jQuery('#messages');
     var newMessage = messages.children('li:last-child');
     var clientHeight = messages.prop('clientHeight');
     var scrollTop = messages.prop('scrollTop');
     var scrollHeight = messages.prop('scrollHeight');
     var newMessageHeight = newMessage.innerHeight();
     var lastMessageHeight = newMessage.prev().innerHeight();
     if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight){
         messages.scrollTop(scrollHeight);
     }
}



socket.on('connect',function(){
    console.log('connected to server !');
    var params = jQuery.deparam(window.location.search);
    socket.emit('join',params,function(error) {
        if(error){
            alert(error);
            window.location.href = '/';
        } else {
            console.log('no error');
        }
    })
});



socket.on('disconect',function(){
    console.log('disconnected from server !');
});

socket.on('updateUserList',function(users){
    var ol = jQuery('<ol></ol>');
    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
    console.log(users);
})

socket.on('newMessage',function(message){
    var formattedTime = moment(message.createAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        text : message.text,
        from : message.from,
        createdAt : formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage',function(message){

    var formattedTime = moment(message.createAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        from : message.from,
        url : message.url,
        createdAt :formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
    // var li = jQuery('<li></li>');
    // var a =jQuery('<a target="_blank">My current location</a>');
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href',message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage',{
        text : messageTextbox.val()
    },function(){
        // CALL BACK MESSAGE.
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser ');
    }

    locationButton.attr('disable','disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        });
    },function(error){
        locationButton.removeAttr('disabled').text('Send location');
        alert('unable to fetch location give permission ',error);
    })
});