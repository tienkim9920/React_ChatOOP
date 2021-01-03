
var Messenger = require('../../models/messenger.model')

module.exports.index = async (req, res) => {

    //Dùng để load ra những tin nhắn mà người dùng định chat
    //Dựa vào id của chính user và id người mà user muốn chat

    const id_user1 = req.query.id_user1
    const id_user2 = req.query.id_user2

    const messenger = await Messenger.findOne({id_user1: id_user1, id_user2: id_user2})

    res.json(messenger)

}

module.exports.send = async (req, res) => {

    //Khi mà user bấm gửi tin nhắn thì nó sẽ lấy query sau đó push vào cơ sở dữ liệu

    const id_user1 = req.query.id_user1
    const id_user2 = req.query.id_user2

    const data = {
        id: req.query.id,
        message: req.query.message,
        name: req.query.name,
        category: req.query.category,
    }

    //Tìm đúng tới cuộc trò chuyện của user xong sau đó push vào
    const messenger = await Messenger.findOne({id_user1: id_user1, id_user2: id_user2})

    messenger.content.push(data)

    messenger.save()

    res.send("Thành Công!")

}