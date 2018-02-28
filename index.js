var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

/*app.get('/', function(req, res){
  res.sendFile(__dirname + '/test.html');
});*/
// Routing
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket) {

  var addedUser = false;

  socket.on('edit', function(data) {
    //io.emit('chat message', data);
    socket.broadcast.emit('edit', data);
  });

// when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    addedUser = true;
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000 !');
});