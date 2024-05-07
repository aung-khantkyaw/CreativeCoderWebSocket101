let express = require('express');
let socket = require('socket.io');

let app = express();

let server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/' , (res, req) => {
    req.sendFile(__dirname + '/public/index.html');
});

let io = socket(server);
io.on('connection', (socket)=>{
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (name) => {
        socket.broadcast.emit('typing', name);
    });
});