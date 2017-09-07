const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;
const io = require('socket.io')(http);
const path = require('path');
const UsernameGenerator = require('username-generator');

const users = [];

app.use(express.static('public'))

io.on('connection', function(socket){

  const user = UsernameGenerator.generateUsername();
  const message = 'has connected. Say hello!'
  users.push(user);
  io.emit('chat message', { user, message })
  io.emit('users', users);

  socket.on('disconnect', function(){
    if (users.indexOf(user) > -1) {
      users.splice(users.indexOf(user), 1);
    }
    io.emit('chat message', { user, message: 'has disconnected' });
    io.emit('users', users);
  });

  socket.on('chat message', (message) => {
    io.emit('chat message', { user, message });
  });

  socket.on('typing', (messageObj) => {
    io.emit('typing', messageObj);
  })
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})

http.listen(3000, () => {
  console.log(`listening on localhost:${port}`);
});
