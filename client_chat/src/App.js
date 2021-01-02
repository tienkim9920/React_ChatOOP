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
import "./Style.css";

function App(props) {
  return (
    <div className="container app">
      <div className="row app-one">
        <div className="col-sm-4 side">
          <div className="side-one">
            <div className="row heading">
              <div className="col-sm-3 col-xs-3 heading-avatar">
                <div className="heading-avatar-icon">
                  <img src="https://bootdey.com/img/Content/avatar/avatar1.png" />
                </div>
              </div>
              <div className="col-sm-1 col-xs-1  heading-dot  pull-right">
                <i
                  className="fa fa-ellipsis-v fa-2x  pull-right"
                  aria-hidden="true"
                ></i>
              </div>
              <div className="col-sm-2 col-xs-2 heading-compose  pull-right">
                <i
                  className="fa fa-comments fa-2x  pull-right"
                  aria-hidden="true"
                ></i>
              </div>
            </div>

            <div className="row searchBox">
              <div className="col-sm-12 searchBox-inner">
                <div className="form-group has-feedback">
                  <input
                    id="searchText"
                    type="text"
                    className="form-control"
                    name="searchText"
                    placeholder="Search"
                  />
                  <span className="glyphicon glyphicon-search form-control-feedback"></span>
                </div>
              </div>
            </div>

            <div className="row sideBar-body">
              <div className="col-sm-3 col-xs-3 sideBar-avatar">
                <div className="avatar-icon">
                  <img src="https://bootdey.com/img/Content/avatar/avatar1.png" />
                </div>
              </div>
              <div className="col-sm-9 col-xs-9 sideBar-main">
                <div className="row">
                  <div className="col-sm-8 col-xs-8 sideBar-name">
                    <span className="name-meta">John Doe</span>
                  </div>
                  <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                    <span className="time-meta pull-right">18:18</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row sideBar-body">
              <div className="col-sm-3 col-xs-3 sideBar-avatar">
                <div className="avatar-icon">
                  <img src="https://bootdey.com/img/Content/avatar/avatar2.png" />
                </div>
              </div>
              <div className="col-sm-9 col-xs-9 sideBar-main">
                <div className="row">
                  <div className="col-sm-8 col-xs-8 sideBar-name">
                    <span className="name-meta">John Doe</span>
                  </div>
                  <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                    <span className="time-meta pull-right">18:18</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row sideBar-body">
              <div className="col-sm-3 col-xs-3 sideBar-avatar">
                <div className="avatar-icon">
                  <img src="https://bootdey.com/img/Content/avatar/avatar3.png" />
                </div>
              </div>
              <div className="col-sm-9 col-xs-9 sideBar-main">
                <div className="row">
                  <div className="col-sm-8 col-xs-8 sideBar-name">
                    <span className="name-meta">John Doe</span>
                  </div>
                  <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                    <span className="time-meta pull-right">18:18</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="col-sm-8 conversation">
          <div className="row heading">
            <div className="col-sm-2 col-md-1 col-xs-3 heading-avatar">
              <div className="heading-avatar-icon">
                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" />
              </div>
            </div>
            <div className="col-sm-8 col-xs-7 heading-name">
              <a className="heading-name-meta">John Doe</a>
              <span className="heading-online">Online</span>
            </div>
            <div className="col-sm-1 col-xs-1  heading-dot pull-right">
              <i
                className="fa fa-ellipsis-v fa-2x  pull-right"
                aria-hidden="true"
              ></i>
            </div>
          </div>

          <div className="row message" id="conversation">
            <div className="row message-previous">
              <div className="col-sm-12 previous">
                <div className="message-main-receiver">
                  <div className="receiver">
                    <span className="message-time pull-right">Sun</span>
                    <div className="message-text">Hi, what are you doing?!</div>
                  </div>
                </div>

                <div className="message-main-sender">
                  <div className="sender">
                    <span className="message-time pull-right">Sun</span>
                    <div className="message-text">I am doing nothing man!</div>
                  </div>
                </div>

                <div className="message-main-sender">
                  <div className="sender">
                    <span className="message-time pull-right">Sun</span>
                    <div className="message-text">I am doing nothing man!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row reply">
            <div className="col-sm-1 col-xs-1 reply-emojis">
              <i className="fa fa-smile-o fa-2x"></i>
            </div>
            <div className="col-sm-9 col-xs-9 reply-main">
              <textarea
                className="form-control"
                rows="1"
                id="comment"
              ></textarea>
            </div>
            <div className="col-sm-1 col-xs-1 reply-recording">
              <i className="fa fa-microphone fa-2x" aria-hidden="true"></i>
            </div>
            <div className="col-sm-1 col-xs-1 reply-send">
              <i className="fa fa-send fa-2x" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
