const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const existingUser2 = await User.findOne({username });
    if (existingUser2) {
      return res.status(400).json({ error: 'Username Already Taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: '2h' });

    res.status(201).json({ message: 'User registered successfully', user: newUser, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '2h' });

      res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// exports.addChat = async (req, res) => {
//   const user_id = req.user.id;
//   const { username } = req.body;
//   // console.log(req.body);

//   try {
//     // Find the user who will be added to the chat
//     const chattedUser = await User.findOne({ username });
//     if (!chattedUser) {
//       return res.status(404).json({ error: 'Username does not exist' });
//     }

//     // Find the user who is adding the chat
//     const user = await User.findById(user_id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Check if chatted user already exists in user's chat array
//     const existingChatIndex = user.chats.findIndex(chat => 
//       !chat.isGrpChat && chat.chattedUsername === chattedUser.username
//     );

//     // If chat exists, remove it
//     if (existingChatIndex > -1) {
//       user.chats.splice(existingChatIndex, 1);
//     }

//     // Prepare the new chat object
//     const newChat = {
//       isGrpChat: false,
//       chattedUsername: chattedUser.username,
//       chattedUserProfilePic: chattedUser.profilePic,
//     };

//     // Add the new chat to the beginning of the user's chat array
//     user.chats.unshift(newChat);

//     // Save the updated user document
//     await user.save();

//     return res.status(200).json({ message: 'Chat added successfully', chat: newChat });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Server error' });
//   }
// };

// exports.addGrp= async (req,res)=>{
//   const user_id = req.user.id;
//   const { grpname, usernames } = req.body;

//   try {
//     // Find users with the given usernames
//     let users = await User.find({ username: { $in: usernames } });

//     if (users.length === 0) {
//       return res.status(400).json({ error: 'No users found with the given usernames' });
//     }

//     const user = await User.findById(user_id);
//     if (!user) {
//       return res.status(404).json({ error: 'Admin user not found' });
//     }

//     // Check if admin user is in the users array, if not, add them
//     const userIsInArray = users.some(u => u._id.equals(user._id));
//     if (!userIsInArray) {
//       users.push(user);
//     }

//     // If users array contains only the admin, return an error
//     if (users.length === 1) {
//       return res.status(400).json({ error: 'Cannot create a group with only the admin' });
//     }

//     // Create group chat details
//     const groupChat = {
//       isGrpChat: true,
//       chattedUsername: grpname,
//       grpProfilePic: 'http://localhost:5000/uploads/profilePics/profilePic-1717740514303.png',
//       adminUsername: user.username,
//       members: users.map(u => ({
//         chattedUsername: u.username,
//         chattedUserProfilePic: u.profilePic
//       }))
//     };

//     // Update each user's chat array with the new group chat at the beginning
//     const userUpdates = users.map(u => {
//       return User.updateOne(
//         { _id: u._id },
//         { $push: { chats: { $each: [groupChat], $position: 0 } } }
//       );
//     });

//     await Promise.all(userUpdates);

//     res.status(201).json({ message: 'Group chat created successfully', groupChat });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// }

// exports.getChat = async (req, res) => {
//   try {
//     // Get user ID from request
//     const userId = req.user.id;

//     // Find the user by ID
//     const user = await User.findById(userId);

//     // If user not found, return error
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Extract chats from user object
//     const chats = user.chats;

//     // Return chats
//     res.status(200).json({ chats });
//   } catch (error) {
//     console.error('Error fetching chats:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };