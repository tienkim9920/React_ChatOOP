const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const cors = require("cors");
const port = 3000;

const usersAPI = require("./api/router/users.router");
const messengerAPI = require("./api/router/messenger.router");

var Messenger = require("./models/messenger.model");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Chat", {
  useFindAndModify: false,
  useCreateIndex: false,
});

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/users", usersAPI);
app.use("/messenger", messengerAPI);


io.on("connection", (socket) => {
  console.log(`Có người vừa kết nối, socketID: ${socket.id}`);

  //Khi user đăng nhập thì server sẽ nhận socket với key: user - value: data
  // socket.on('send_user', (data) => {
  //   console.log(data.name + " vừa đăng nhập vào socket || " + data.user_id)

  //Sau đó gửi ngược lại client
  // socket.broadcast.emit('receive_user', data)
  // })

  //Server nhận key send_message với value data do người dùng gửi lên
  socket.on("send_message", (data) => {
    console.log(data.name + ": " + data.message);

    //Sau đó nó sẽ update lại database bên phía người nhận
    //Vì 1 bên gửi 1 bên nhận nên id_user đôi ngược nhau và category cũng vậy
    const newData = {
      id_user1: data.id_user2,
      id_user2: data.id_user1,
      id: Math.random().toString(),
      message: data.message,
      name: data.name,
      category: "receive",
    };

    console.log(newData.message);

    const postData = async () => {
      const messenger = await Messenger.findOne({
        id_user1: newData.id_user1,
        id_user2: newData.id_user2,
      });

      messenger.content.push(newData);

      messenger.save();
    };

    postData();

    //Xử lý xong server gửi ngược lại client thông qua socket với key receive_message
    socket.broadcast.emit("receive_message");
  });

  //server nhận socket do client gửi lên thì sẽ trả ngược lại client tương tự
  socket.on("keyboard_message_send", (data) => {
    console.log(data.id_user1 + ": " + data.message);

    socket.broadcast.emit("keyboard_message_receive", data);
  });

  // socket.on('user-id', (id) => {
  //     console.log("user-id: " + id + " đã tham gia cuộc trò chuyện");
  // });

  // //Server nhận key sendmessage với data đã truyền
  // socket.on('send_message', (data) => {
  //   console.log(data.userID + ": " + data.message)

  //   //Sau đó server gửi ngược trở lại client với key receive_message và value vẫn là data
  //   socket.broadcast.emit('receive_message', data)

  // })

  // socket.on('send-chat', (data) => {
  //     const { message, room } = data;
  //     console.log(`msg: ${message}, room: ${room}`);

  //     socket.broadcast.emit('chat-messegae', {message: message})
  // });

  // socket.on('disconnect', () =>
  //   console.log(`Disconnected: ${socket.id}`));
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
