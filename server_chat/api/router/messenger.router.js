var express = require('express')

var router = express.Router()

var messenger = require('../controller/messenger.controller')

router.get('/', messenger.index)

router.post('/send', messenger.send)

module.exports = router