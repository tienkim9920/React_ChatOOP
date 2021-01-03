var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    { 
        id_user1: String,
        id_user2: String,
        content: Array
    }
);

var Messenger = mongoose.model('Messenger', schema, 'messenger');

module.exports = Messenger;