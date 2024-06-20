const express = require('express');
const authMiddleware = require('../middleware/authMiddleware.js');
const {getMsg } = require('../controller/msgController.js');
const {sendMessage} =require ('../socket.js')

const msgRoute = express.Router();

msgRoute.post("/getMsg",authMiddleware,getMsg)
msgRoute.post("/sendMessage",authMiddleware,sendMessage)

module.exports = msgRoute; 