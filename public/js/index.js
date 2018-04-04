var socket =io();
socket.on('connect',()=>{
    console.log('Connected to the server');
});

socket.on('newMessage',function (message) {
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
    console.log('new message comes',message);
});

socket.on('disconnect',()=>{
    console.log('Disconnected from the server');
});

jQuery('#message-form').on('submit',function (e) {
    e.preventDefault();
    socket.emit('createMessage',{
        from :'User',
        text : jQuery('[name=message]').val()
    },function (data) {
        console.log('Got',data)
    });
});