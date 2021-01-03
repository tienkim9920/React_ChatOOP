// import React, { useEffect, useState } from "react";
// import './App.css'

// import io from "socket.io-client";
// const socket = io("http://localhost:3000");

// function App() {

//   //userid
//   const [userID, setUserID] = useState('')

//   const [send, setSend] = useState('')

//   const [render, setRender] = useState({
//     chat: []
//   })

//   //Chạy lần đầu để gửi user lên server bằng socket
//   useEffect(() => {

//     const user_id = prompt("What Is Your Name?")
//     setUserID(user_id)

//     socket.emit('user-id', user_id)

//   }, [])

//   const onChangeText = (e) => {
//     setSend(e.target.value)
//   }

//   //Chức năng gửi tin nhắn
//   const handlerSendMessage = () => {

//     //Khi bấm gửi tin nhắn thì phải clone array cũ ra
//     const newRender = render.chat

//     //Sau đó set thuộc tính cho object để push vào array mới
//     const category = {
//       id: Math.random().toString(),
//       category: 'send',
//       message: send
//     }

//     //push vào array mới
//     newRender.push(category)

//     //Sau đó sét state cho array
//     setRender({
//       chat: newRender
//     })

//     console.log(render)

//     //Tiếp theo sẽ set data để gửi lên server bằng socket
//     const data = {
//       userID: userID,
//       message: send
//     }

//     //Gửi lên server với key send_message
//     socket.emit('send_message', data)

//     setSend('')

//   }

//   //Gọi lại hàm useEffect để nhận dữ liệu từ socket gửi ngược trở lại
//   useEffect(() => {

//     //Nhận dự liệu với key receive_message
//     socket.on('receive_message', (data) => {
//       console.log(data.userID + ': ' + data.message)

//       //Các bước này thì tương tự
//       const newRender = render.chat

//       //Nhưng khác ở chỗ là data lần này thêm vào mảng thì có category khác
//       const category = {
//         id: Math.random().toString(),
//         name: data.userID,
//         category: 'receive',
//         message: data.message
//       }

//       newRender.push(category)

//       console.log(newRender)

//       setRender({
//         chat: newRender
//       })

//     })

//   }, [])

//   return (
//     <div classNameNameName="page-content page-container" id="page-content">
//       <div classNameNameName="padding">
//         <div classNameNameName="row container d-flex justify-content-center">
//           <div classNameNameName="col-md-6">
//             <div classNameNameName="card card-bordered">
//             <div classNameNameName="card-header">
//                 <h4 classNameNameName="card-title">
//                   <strong>Chat</strong>
//                 </h4>
//                 <a classNameNameName="btn btn-xs btn-secondary" href="#" data-abc="true">
//                   Let's Chat App
//                 </a>
//             </div>

//             <div classNameNameName="ps-container ps-theme-default ps-active-y">

//               {
//                 render && render.chat.map(value => (
//                   value.category === 'receive' ? (<div classNameNameName="media media-chat" key={value.id}>
//                   <img classNameNameName="avatar avatar-xs" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." />
//                   <div classNameNameName="media-body">
//                       <p>{value.name}: {value.message}</p>
//                   </div>
//                 </div>) : (<div classNameNameName="media media-chat media-chat-reverse" key={value.id}>
//                       <div classNameNameName="media-body">
//                           <p>You: {value.message}</p>
//                       </div>
//                   </div> )
//                 ))
//               }

//             </div>

//             <div classNameNameName="publisher bt-1 border-light">
//               <img classNameNameName="avatar avatar-xs" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." />
//               <input classNameNameName="publisher-input" type="text" placeholder="Write something" onChange={onChangeText} value={send}/>
//               <span classNameNameName="publisher-btn file-group"> <i classNameNameName="fa fa-paperclip file-browser"></i> <input type="file"/>
//               </span>
//               <a classNameNameName="publisher-btn"><i classNameNameName="fa fa-smile"></i></a>
//               <a classNameNameName="publisher-btn text-info" onClick={() => handlerSendMessage()}><i classNameNameName="fa fa-paper-plane"></i></a>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React from "react";
import './App.css'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import SignIn from './Authentication/SignIn/SignIn'
import Chat from "./Chat/Chat";



function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/SignIn" component={SignIn} />
        <Route path="/Chat" component={Chat} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
