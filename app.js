var express = require('express'),
    exp = express(),
    server = require('http').createServer(exp),
    io = require('socket.io').listen(server),
    fs = require('fs');
server.listen(3000);

exp.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function(socket){
  socket.on('send_position', function(data){
    io.sockets.emit('receive_position', data);
  });
})

console.log('server start!!');
