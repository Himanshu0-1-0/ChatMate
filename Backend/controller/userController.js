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

    const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: '3h' });

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


exports.changeProfilePic = async (req, res) => {
  const userId = req.user.id;
  const newProfilePic = req.body.profilePic;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profilePic = newProfilePic;
    await user.save();

    res.status(200).json({ message: 'Profile picture updated successfully' });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.changePassword =  async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify if the current password matches
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 8);

    // Update the password in the user document
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getProfile= async(req,res)=>{
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password -chats'); // Exclude the password field

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Server error');
  }
}