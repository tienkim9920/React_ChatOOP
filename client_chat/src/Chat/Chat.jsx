import React, { useEffect, useState } from 'react';
import './Chat.css'
import UserAPI from '../API/UserAPI';
import ListUser from './Component/ListUser';
import queryString from 'query-string'
import MessengerAPI from '../API/MessengerAPI';

import io from "socket.io-client";
const socket = io("http://localhost:3000");

function Chat(props) {

    if (!sessionStorage.getItem('user_id')) {
        window.location.replace("/SignIn");
    }

    const [name, setName] = useState('')

    const [userID1, setUserID1] = useState(sessionStorage.getItem('user_id'))
    const [userID2, setUserID2] = useState('')

    const [listUser, setListUser] = useState([])

    const [anotherUser, setAnotherUser] = useState({})

    const [conversation, setConversation] = useState([])

    const [load, setLoad] = useState(false)

    const [send, setSend] = useState('')

    //Hàm này sẽ render ra người mà user định chat
    //Nó sẽ nhận dữ liệu từ component ListUser gửi lên xong sau đó nó sẽ setUserID2
    //Tiếp theo nó sẽ setLoad để gọi lại hàm useEffect load dữ liệu tin nhắn ra
    const GetUserID = (value) => {
        
        const id_another = value

        setUserID2(value)

        const another = listUser.find(value => {
            return value._id === id_another
        })

        console.log(another)

        setAnotherUser(another)

        setLoad(true)

    }

    //Hàm này chỉ chạy 1 lần duy nhất dùng để load những người bạn của user
    //Trừ user ra
    useEffect(() => {

        const fetchData = async () => {

            const response = await UserAPI.getAll()
            console.log(response)

            const filterUser = response.filter(value => {
                return value._id !== sessionStorage.getItem('user_id')
            })
            console.log(filterUser)

            setListUser(filterUser)
        }

        fetchData()

        console.log(name)

    }, [])

    const onChangeSend = (e) => {
        setSend(e.target.value)
    }
    
    //Hàm này dùng để gửi tin nhắn
    const handlerSend = () => {
        
        //Nếu User chưa bấm vào thì không thể gửi được
        if (!userID2){
            return
        }

        //Khi gửi tin nhắn thì nó sẽ lấy id của cả 2 người
        //Với cái key category có value là send
        //Vì là gửi tin nhắn
        const data = {
            id_user1: userID1,
            id_user2: userID2,
            id: Math.random().toString(),
            message: send,
            name: sessionStorage.getItem('name_user'),
            category: "send"
        }

        console.log(data.name + ": " + data.message)

        //Sau đó nó emit dữ liệu lên server bằng socket với key send_message và value data
        socket.emit('send_message', data)


        //Tiếp theo nó sẽ postdata lên api đưa dữ liệu vào database
        const postData = async () => {

            const query = '?' + queryString.stringify(data)

            const response = await MessengerAPI.postMessage(query)

            console.log(response)

            //Sau đó gọi hàm setLoad để useEffect lấy lại dữ liệu sau khi update
            setLoad(true)

        }

        postData()

        setSend('')

    }

    //Đây là hàm lấy dữ liệu từ api dựa vào state load
    useEffect(() => {

        if (load){
            const fetchData = async () => {

                const params = {
                    id_user1: userID1,
                    id_user2: userID2
                }
    
                const query = '?' + queryString.stringify(params)
    
                const response = await MessengerAPI.getAllMessage(query)
                console.log(response.content)
    
                setConversation(response.content)

            }
    
            fetchData()
        }

        setLoad(false)

    }, [load])


    useEffect(() => {

        //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_message
        socket.on('receive_message', (data) => {
            
            //Sau đó nó sẽ setLoad gọi lại hàm useEffect lấy lại dữ liệu
            setLoad(true)
  
        })

    }, [])

    return (
        <div className="container app">
            <div className="row app-one">
                <div className="col-sm-4 side">
                    <div className="side-one">
                        <div className="row heading">
                            <div className="col-sm-3 col-xs-3 heading-avatar">
                                <div className="heading-avatar-icon">
                                    <img src={sessionStorage.getItem('image_user')} />
                                </div>
                            </div>
                            <div className="col-sm-9 col-xs-1 d-flex align-items-center">
                                <span>{sessionStorage.getItem('name_user')}</span>
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

                        <ListUser listUser={listUser} GetUserID={GetUserID}/>

                    </div>
                </div>

                <div className="col-sm-8 conversation">
                    <div className="row heading">
                        {
                            anotherUser && (<div className="col-sm-2 col-md-1 col-xs-3 heading-avatar">
                            <div className="heading-avatar-icon">
                                <img src={anotherUser.image} />
                            </div>
                        </div>)
                        }
                        <div className="col-sm-8 col-xs-7 heading-name">
                            <a className="heading-name-meta">{anotherUser.name}</a>
                            <span className="heading-online">Online</span>
                        </div>
                    </div>

                    <div className="row message" id="conversation">
                        <div className="row message-previous">
                            <div className="col-sm-12 previous">
                                {
                                    conversation && conversation.map(value => (
                                        value.category === 'send' ? (
                                            <div className="message-main-sender" key={value.id}>
                                                <div className="sender">
                                                    <span className="message-time pull-right">Bạn</span>
                                                    <div className="message-text">{value.message}</div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="message-main-receiver" key={value.id}>
                                                <div className="receiver">
                                                    <span className="message-time pull-right">{value.name}</span>
                                                    <div className="message-text">{value.message}</div>
                                                </div>
                                            </div>
                                        )
                                    ))
                                }             
                               
                            </div>
                        </div>
                    </div>

                    <div className="row reply">
                        <div className="col-sm-1 col-xs-1 reply-emojis">
                            <i className="fa fa-smile-o fa-2x"></i>
                        </div>
                        <div className="col-sm-9 col-xs-9 reply-main">
                            <input className="form-control" type="text" value={send} onChange={onChangeSend} />
                        </div>
                        <div className="col-sm-1 col-xs-1 reply-recording">
                            <i className="fa fa-microphone fa-2x" aria-hidden="true"></i>
                        </div>
                        <div className="col-sm-1 col-xs-1 reply-send">
                            <i className="fa fa-send fa-2x" aria-hidden="true" onClick={handlerSend}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;