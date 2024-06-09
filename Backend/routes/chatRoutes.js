const express = require('express');
const authMiddleware = require('../middleware/authMiddleware.js');
const { addChat, addGrp, getChat} = require('../controller/chatController.js');
const chatRoute = express.Router();

chatRoute.post('/addChat', authMiddleware, addChat);
chatRoute.post('/addGrp', authMiddleware, addGrp);
chatRoute.get('/getChats', authMiddleware, getChat);

module.exports = chatRoute;