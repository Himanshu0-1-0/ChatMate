const socketio = require('socket.io');
const jwt = require('jsonwebtoken');
const Message = require('./models/msgModel'); 
const Chat = require('./models/chatModel'); 

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



function getIo() {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
}

module.exports = {
  initializeSocket,
  getIo,
};
