const path =require('path');
const publicPath =path.join(__dirname,'../public');
const http =require('http');
const express =require('express');
const socketIO =require('socket.io');


var port =process.env.PORT || 3000;
var app =express();
var server= http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log("A new client id connected");

    socket.emit('newMessage',{
from:'amin@gmail.com',
        text :"hello everybody",
        createdAt :123
    });

    socket.on('createMessage',(message)=>{
       console.log('Email created',message)
    });

    socket.on('disconnect',()=>{
    console.log('The client was disconnected');
    });
});


server.listen(port,() =>{
    console.log(`server is running on port ${port}`);
});
