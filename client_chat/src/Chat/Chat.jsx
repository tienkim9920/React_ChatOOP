import React, { useEffect, useState } from 'react';
import './Chat.css'
import UserAPI from '../API/UserAPI';
import ListUser from './Component/ListUser';
import queryString, { stringify } from 'query-string'
import MessengerAPI from '../API/MessengerAPI';
import parse from 'html-react-parser';

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

    const [loadMessage, setLoadMessage] = useState(false)


    const [messReceive, setMessReceive] = useState('')
    const [user1_Receive, setUser1Receive] = useState('')
    const [user2_Receive, setUser2Receive] = useState('')

    //Hàm này sẽ render ra người mà user định chat
    //Nó sẽ nhận dữ liệu từ component ListUser gửi lên xong sau đó nó sẽ setUserID2
    //Tiếp theo nó sẽ setLoad để gọi lại hàm useEffect load dữ liệu tin nhắn ra
    const GetUserID = (value) => {
        
        const id_another = value

        const another = listUser.find(value => {
            return value._id === id_another
        })

        console.log(another)

        setAnotherUser(another)

        setLoad(true)

        setUserID2(id_another)

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

        const value = e.target.value

        setSend(value)

        const data = {
            message: value,
            id_user1: userID2,
            id_user2: userID1
        }

        // console.log(data)

        //Nếu user đang bấm phím để gửi tin nhắn thì sẽ gửi socket lên server với key keyboard_message_send
        //Để cho đối phương biết là user đang gửi tin nhắn
        //Vì gửi là user muốn gửi đến người nào
        //Nên chúng ta phải lấy id_user của đối phương mà user muốn gửi
        if (send){
            socket.emit('keyboard_message_send', data)   
        }else{
            socket.emit('keyboard_message_send', data)
        }
    
    }

    //Client nhận dữ liệu từ server gửi xuống thông qua socket
    useEffect(() => {

        socket.on('keyboard_message_receive', (data) => {
            
            const message = data.message
            const id_user1 = data.id_user1
            const id_user2 = data.id_user2

            //Ở bên phía người nhận thì sẽ có userID1 của chính mình
            //Nếu mà có tin nhắn và đúng với id_user của người gửi đúng với userID1 của chính mình thì sẽ load
            if (message !== '' && id_user1 === userID1 && id_user2 === userID2){
                setLoadMessage(true)
            }else{
                setLoadMessage(false)
            }

        })

    }, [])

    
    //Hàm này dùng để gửi tin nhắn
    const handlerSend = () => {
        
        //Nếu User chưa bấm vào thì không thể gửi được
        if (!userID2){
            return
        }

        //Gọi hàm formaticon đã tạo sẵn để xử lý
        const formatMessage = formatIcon(send)

        //Khi gửi tin nhắn thì nó sẽ lấy id của cả 2 người
        //Với cái key category có value là send
        //Vì là gửi tin nhắn
        const data = {
            id_user1: userID1,
            id_user2: userID2,
            id: Math.random().toString(),
            message: formatMessage, 
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

    //Hàm này dùng để format icon
    function formatIcon(send) {
        
        //Đây là list icon dùng để duyệt và đổ ra dữ liệu
        const icon = [
            { id: 1, image: `<img src='https://www.flaticon.com/svg/static/icons/svg/742/742760.svg' />`, category: ':('},
            { id: 2, image: `<img src='https://www.flaticon.com/svg/static/icons/svg/742/742750.svg' />`, category: '*_*'},
            { id: 3, image: `<img src='https://www.flaticon.com/svg/static/icons/svg/742/742920.svg' />`, category: ':)'},
            { id: 4, image: `<img src='https://www.flaticon.com/svg/static/icons/svg/742/742822.svg' />`, category: 'T_T'},
            { id: 5, image: `<img src='https://www.flaticon.com/svg/static/icons/svg/742/742787.svg' />`, category: '-,-'},
            { id: 6, image: `<img src='https://www.flaticon.com/svg/static/icons/svg/742/742745.svg' />`, category: ':*'},
        ]

        //Duyệt vòng foreach của list icon để kiểm tra chuỗi truyền vào có tồn tại category không
        //Nếu trong cái chuỗi string đó có tồn tại category của icon thì nó sẽ replace thành thẻ <image>
        icon.forEach(element => {
            if (send.indexOf(element.category) > -1){
                console.log("True")

                //Replace
                send = send.replace(element.category, element.image)

            }
        });

        return send
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

    //Click hiện danh sách Icon
    const [emotion, setEmotion] = useState(false)
    const onClickEmotion = () => {
        
        setEmotion(!emotion)

    }

    //Click vào từng icon nó sẽ nhận cái value truyền vào theo từng loại
    const onClickIcon = (value) => {
        
        setSend(send + "" + value + " ")
 
    }

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
                                                    <div className="message-text">
                                                    {
                                                        parse(value.message)
                                                    }
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="message-main-receiver" key={value.id}>
                                                <div className="receiver">
                                                    <span className="message-time pull-right">{value.name}</span>
                                                    <div className="message-text">
                                                    {
                                                        parse(value.message)
                                                    }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    ))
                                }         
                                {
                                    loadMessage && (<div className="wrapper_loading">
                                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                </div>)
                                } 
                            </div>
                        </div>
                    </div>

                    {
                        emotion && (<div className="show_icon">
                        <div className="list_icon">
                            <div className="icon" onClick={() => onClickIcon(":(")}>
                                <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/742/742760.svg" alt=""/>
                            </div>
                            <div className="icon" onClick={() => onClickIcon("*_*")}>
                                <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/742/742750.svg" alt=""/>
                            </div>
                            <div className="icon" onClick={() => onClickIcon(":)")}>
                                <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/742/742920.svg" alt=""/>
                            </div>
                            <div className="icon" onClick={() => onClickIcon("T_T")}>
                                <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/742/742822.svg" alt=""/>
                            </div>
                            <div className="icon" onClick={() => onClickIcon("-,-")}>
                                <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/742/742787.svg" alt=""/>
                            </div>
                            <div className="icon" onClick={() => onClickIcon(":*")}>
                                <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/742/742745.svg" alt=""/>
                            </div>
                        </div>
                    </div>)
                    }

                    <div className="row reply">
                        <div className="col-sm-1 col-xs-1 reply-emojis">
                            <i className="fa fa-smile-o fa-2x" onClick={onClickEmotion}></i>
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