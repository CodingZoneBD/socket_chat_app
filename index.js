const express = require('express')
const app = express();
const http = require('http');
const expressServer = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(expressServer);


io.on('connection', function (socket) {
    console.log("New User Connected");
    socket.on('chat', function (msg) {
        io.emit('chat_transfer', msg)
    })

    // Room Join
    socket.join('room-name');
    // Room Active user
    let roomSize = io.sockets.adapter.rooms.get('room-name').size;
    // Room Event fire
    io.sockets.in('room-name').emit('working', "This room " + roomSize + " member now working")

})


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/room', function (req, res) {
    res.sendFile(__dirname + '/room.html');
});


expressServer.listen(3000, function () {
    console.log("Server run On 3000 Port")
})