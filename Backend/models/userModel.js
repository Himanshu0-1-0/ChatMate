const mongoose= require("mongoose");

// mongoose.connect("mongodb://localhost:27017") 

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: 'http://localhost:5000/uploads/profilePics/profilePic-1717740514303.png', 
  },
  chats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
  }],
}, {
  timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
