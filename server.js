const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;
const io = require('socket.io')(http);

app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log('user connected');
});

http.listen(3000, () => {
  console.log(`listening on localhost:${port}`);
});
