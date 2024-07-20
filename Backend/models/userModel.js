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
    default: 'https://himanshumehta8104chatmatestoragebucket.s3.eu-north-1.amazonaws.com/profilePics/download+(1).png', 
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
