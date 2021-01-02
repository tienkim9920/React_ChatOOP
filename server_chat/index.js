const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


io.on('connection', (socket) => {
    console.log(`Có người vừa kết nối, socketID: ${socket.id}`)


    socket.on('user-id', (id) => {
        console.log("user-id: " + id + " đã tham gia cuộc trò chuyện");
    });

    //Server nhận key sendmessage với data đã truyền
    socket.on('send_message', (data) => {
      console.log(data.userID + ": " + data.message)

      //Sau đó server gửi ngược trở lại client với key receive_message và value vẫn là data
      socket.broadcast.emit('receive_message', data)

    })

    // socket.on('send-chat', (data) => {
    //     const { message, room } = data;
    //     console.log(`msg: ${message}, room: ${room}`);

    //     socket.broadcast.emit('chat-messegae', {message: message})
    // });



    // socket.on('disconnect', () =>
    //   console.log(`Disconnected: ${socket.id}`));

});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})