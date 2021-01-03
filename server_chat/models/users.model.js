var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    { 
        name: String,
        email: String,
        password: String,
        image: String
    }
);

var Users = mongoose.model('Users', schema, 'users');

module.exports = Users;