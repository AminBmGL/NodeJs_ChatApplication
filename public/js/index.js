var socket =io();
socket.on('connect',()=>{
    console.log('Connected to the server');

});

socket.on('newMessage',function (message) {
    console.log('new message comes',message);
});

socket.on('disconnect',()=>{
    console.log('Disconnected from the server');
});