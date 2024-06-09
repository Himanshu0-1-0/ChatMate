const mongoose= require("mongoose");


const chatSchema = new mongoose.Schema({
  isGrpChat: {
    type: Boolean,
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  chatName: {
    type: String,
    required: function() { return this.isGrpChat; }
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() { return this.isGrpChat; }
  },
  chatProfilePic: {
    type: String,
    default: 'http://localhost:5000/uploads/profilePics/profilePic-1717740514303.png',
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
}, {
  timestamps: true
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
