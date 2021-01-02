import io from 'socket.io-client'
let socket

export const initiateSocket = (room) => {
    socket = io('http://localhost:3000')
    console.log(`Connecting socket...`)
    if (socket && room){
        socket.emit('join', room)
    }
}

export const disconnectSocket = () => {
    console.log('Disconnecting socket...')
    if(socket){
        socket.disconnect();
    }
}

export const subscribeToChat = (data) => {
    if (!socket){
        return(true)
    }

    socket.on('chat-messegae', message => {
        console.log('Websocket event received!');
        return data(message);
    })
}

export const sendMessage = (room, message) => {
    if (socket){
        socket.emit('send-chat', { message, room })
    }
}