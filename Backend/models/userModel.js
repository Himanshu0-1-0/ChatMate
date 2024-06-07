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
  chats: [
    {
      isGrpChat: { type: Boolean, required: true },
      chattedUsername: { type: String },
      chattedUserProfilePic: { type: String,default: 'http://localhost:5000/uploads/profilePics/profilePic-1717740514303.png' },
      grpProfilePic: { type: String ,default: 'http://localhost:5000/uploads/profilePics/profilePic-1717740514303.png'},
      adminUsername: { type: String },
      members: [
        {
          chattedUsername: { type: String },
          chattedUserProfilePic: { type: String },
        }
      ]
    }
  ]
},{
    timestamps: true 
  });

const User = mongoose.model('User', userSchema);

module.exports = User;