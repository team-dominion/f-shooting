var express = require('express'),
    exp = express(),
    server = require('http').createServer(exp),
    io = require('socket.io').listen(server),
    fs = require('fs');
server.listen(3000);

exp.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function(socket){
  socket.on('emit_from_client', function(data){
    io.sockets.emit('emit_from_server', 'hello from server: ' + data);
  });
})

console.log('server start!!');
