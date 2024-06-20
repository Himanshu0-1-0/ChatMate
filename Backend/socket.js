const socketio = require('socket.io');
const jwt = require('jsonwebtoken');
const Message = require('./models/msgModel'); 
const Chat = require('./models/chatModel'); 
const User = require('./models/userModel');
const mongoose= require("mongoose");

let io;

const initializeSocket = (server) => {
  io = socketio(server, {
    cors: {
      origin: '*',
    },
    pingTimeout:60000,
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) { 
        return next(new Error('Authentication error'));
      }
      socket.user = decoded;
      next();
    });
  });

  io.on('connection', (socket) => {
    console.log('New client connected', socket.user);

    socket.on('joinRoom', (chatId) => {
      socket.join(chatId);
      console.log(`User joined room: ${chatId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

const sendMessage = async (req, res) => {
  const { chatId, content } = req.body;
  const senderId = req.user.id;

  if (!chatId || !content) {
    return res.status(400).json({ error: 'Chat ID and content are required' });
  }
  if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ error: "Invalid chatId" });
    }

  try {
    const newMessage = new Message({
      sender: senderId,
      chat: chatId,
      content,
    });

    const savedMessage = await newMessage.save();

    // Update last message in the chat
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { lastMessage: savedMessage._id, lastMessageTime: savedMessage.createdAt },
      { new: true }
    );

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    const memberIds = chat.members.map(member => member._id);
    const userUpdates = memberIds.map(userId => {
      return User.findByIdAndUpdate(
        userId,
        { $pull: { chats: chatId } }, // Remove chatId if it already exists
        { new: true }
      ).then(() => {
        return User.findByIdAndUpdate(
          userId,
          { $push: { chats: { $each: [chatId], $position: 0 } } } // Add chatId at the beginning
        );
      });
    });

    // Wait for all user updates to complete
    await Promise.all(userUpdates);

    const sender = await User.findById(senderId).select('username _id profilePic');

    io.to(chatId.toString()).emit('newMessage', {
      _id: savedMessage._id,
      sender: sender,
      chat: savedMessage.chat,
      content: savedMessage.content,
      createdAt: savedMessage.createdAt,
    });
    // console.log("msg "+JSON.stringify())

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

function getIo() {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
}

module.exports = {
  initializeSocket,
  getIo,
  sendMessage,
};
