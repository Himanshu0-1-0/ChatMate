// controllers/chatController.js
const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const Message = require('../models/msgModel');
const mongoose = require('mongoose');

exports.addChat = async (req, res) => {
    const userId = req.user.id;
    const { username } = req.body;
  
    try {
      const chattedUser = await User.findOne({ username });
      if (!chattedUser) {
        return res.status(404).json({ error: 'Username does not exist' });
      }
  
      let chat = await Chat.findOne({
        isGrpChat: false,
        members: { $all: [userId, chattedUser._id] }
      });
  
      if (!chat) {
        chat = new Chat({
          isGrpChat: false,
          members: [userId, chattedUser._id],
        });
        await chat.save();
  
        // Add new chat to the beginning of the user's chats array
        await User.updateMany(
          { _id: { $in: [userId, chattedUser._id] } },
          { $push: { chats: { $each: [chat._id], $position: 0 } } }
        );
      } else {
        // Move the existing chat to the beginning for both users
        await User.updateMany(
          { _id: { $in: [userId, chattedUser._id] } },
          { $pull: { chats: chat._id } }
        );
  
        await User.updateMany(
          { _id: { $in: [userId, chattedUser._id] } },
          { $push: { chats: { $each: [chat._id], $position: 0 } } }
        );
      }
  
      // Fetch updated chats for both users to send to the frontend
      const updatedUser = await User.findById(userId).populate({
        path: 'chats',
        populate: {
          path: 'members',
          select: 'username profilePic'
        }
      });
  
      const updatedChattedUser = await User.findById(chattedUser._id).populate({
        path: 'chats',
        populate: {
          path: 'members',
          select: 'username profilePic'
        }
      });
  
      return res.status(200).json({
        message: 'Chat added successfully',
        chat,
        updatedUserChats: updatedUser.chats,
        updatedChattedUserChats: updatedChattedUser.chats
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  };

  exports.addGrp = async (req, res) => {
    const userId = req.user.id;
    const { grpname, usernames } = req.body;
  
    try {
      // Find users with the given usernames
      let users = await User.find({ username: { $in: usernames } });
  
      if (users.length === 0) {
        return res.status(400).json({ error: 'No users found with the given usernames' });
      }
  
      // Include admin in the users list if not already present
      const adminUser = await User.findById(userId);
      if (!users.some(u => u._id.equals(adminUser._id))) {
        users.push(adminUser);
      }
  
      // Convert usernames to ObjectIds
      const memberIds = users.map(u => u._id);
  
      // Create group chat object
      const groupChat = new Chat({
        isGrpChat: true,
        chatName: grpname,
        admin: adminUser._id,
        members: memberIds,
        grpProfilePic: 'http://example.com/group-profile-pic.jpg', // Set the URL of the group's profile picture
      });
      console.log(groupChat);
      // Save group chat object
      await groupChat.save();
  
      // Update each user's chat array with the new group chat at the beginning
      const updatePromises = users.map(u => {
        return User.findByIdAndUpdate(
          u._id,
          { $push: { chats: { $each: [groupChat._id], $position: 0 } } },
          { new: true }
        );
      });
  
      // Wait for all user updates to complete
      await Promise.all(updatePromises);
  
      // Respond with success message and group chat object
      res.status(201).json({ message: 'Group chat created successfully', groupChat });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  

exports.getChat = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const user = await User.findById(userId).populate({
        path: 'chats',
        populate: [
          {
            path: 'members',
            select: 'username profilePic'
          },
          {
            path: 'lastMessage',
            select: 'content createdAt'
          }
        ]
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Prepare chats with necessary details
      const chats = user.chats.map(chat => {
        const otherMember = chat.members.find(member => member._id.toString() !== userId.toString());
        return {
          _id: chat._id,
          isGrpChat: chat.isGrpChat,
          otherUserId: otherMember ? otherMember._id : null,
          otherUsername: otherMember ? otherMember.username : null,
          otherUserProfilePic: otherMember ? otherMember.profilePic : null,
          lastMessage: chat.lastMessage ? chat.lastMessage.content : null,
          lastMessageTime: chat.lastMessage ? chat.lastMessage.createdAt : null,
          grpProfilePic: chat.isGrpChat ? chat.chatProfilePic : null,
          grpName: chat.isGrpChat ? chat.chatName: null
        };
      });
  
      res.status(200).json({ chats });
    } catch (error) {
      console.error('Error fetching chats:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };