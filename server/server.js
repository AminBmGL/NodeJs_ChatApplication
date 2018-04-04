const path =require('path');
const publicPath =path.join(__dirname,'../public');
const http =require('http');
const express =require('express');
const socketIO =require('socket.io');

var port =process.env.PORT || 3000;
var app =express();
var server= http.createServer(app);
var io=socketIO(server);
var {generateMessage,generateLocationMessage} =require('./../utils/message');

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log("A new client id connected");

    socket.emit('newMessage',generateMessage("Admin","Welcome to the application chat"));
    //socket.brodcast.emit : sends the messages for all the users exept the one that sends the message
    socket.broadcast.emit('newMessage',generateMessage("Admin","New user joinded the app"));

    socket.on('createMessage',(message,callback)=> {
       console.log('Email created',message);
       /*on.emit sends the data for every single connection | socket.emit sends the data for a single connection */
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback('Acknowledgment from the server');
    });
    socket.on('createNewLocation',(position) =>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',position.latitude,position.longitude));
    });

    socket.on('disconnect',()=>{
    console.log('The client was disconnected');
    });
});


server.listen(port,() =>{
    console.log(`server is running on port ${port}`);
});
