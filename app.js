var express = require('express'),
    mongoose = require('mongoose'),
    exp = express(),
    server = require('http').createServer(exp),
    io = require('socket.io').listen(server),
    fs = require('fs');
server.listen(3000);

//route
exp.use(express.static(__dirname + '/public'));

//mongoose
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  id            : ObjectId,
  userid        : String,
  state         : String,
  begining-time : Date
});
mongoose.model('User', UserSchema);
mongoose.connect('mongodb://localhost/#');
var User = mongoose.model('User');

//socket
io.sockets.on('connection', function(socket){
  socket.on('send_position', function(data){
    switch(data.state){
      case 'wait':
        //connect to DB
        var user = new User();
        user.userid
        //rewrite state to host or join
      case 'host':
        //If connecting another player, set start time and rewrite state to play
      case 'join'
        //rewrite state to play

        //get start time

      case 'dead':
        //delete lecode
        //rewrite state to wait
      default:
        //add record
        var user = new User();
        data.userid = socket.id;
        user.userid = data.userid;
        user.state = data.state;

        user.save(function(err){
          if(err){
            console.log(err);
          };
        });
    }
  }
    socket.broadcast.emit('receive_position', data);
    console.log(data);
  });
})

console.log('server start!!');