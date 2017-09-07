const socket = io();
let user = ''

$('form').submit(() => {
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat message', (messageObj) => {
  user = messageObj.user;
  $('#messages').append($('<li>').text(`${messageObj.user}: ${messageObj.message}`));
});

socket.on('users', (users) => {
  $('.users').text(`
    Connected Users: ${users}
  `)
})

$('#m').on('keyup', (e) => {
    console.log(e.target.value.length);
    if (e.target.value.length > 0) {
      socket.emit('typing', {
        message: 'is typing...',
        user,
      });
    } else {
      socket.emit('typing', {
        message: 'Type Something!',
        user: '',
      })
    }

})

socket.on('typing', (messageObj) => {
  $('#m').prop('placeholder',`${messageObj.user} ${messageObj.message}`);
})
