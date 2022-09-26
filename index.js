const express = require('express')
const app = express();
const http = require('http');
const expressServer = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(expressServer);


io.on('connection', function (socket) {
    console.log("New User Connected");
})


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


expressServer.listen(3008, function () {
    console.log("Server run On 3008 Port")
})