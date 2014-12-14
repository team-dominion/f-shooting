var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');
app.listen(1337, '127.0.0.1');

function handler(req, res){
  fs.readFile('./index.html', function(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error');
    }
    res.writeHead(200);
    res.write(data);
    res.end();
  })
}

io.sockets.on('connection', function(socket){
  socket.on('emit_from_client', function(data){
    socket.emit('emit_from_server', 'hello from server: ' + data);
  });
});