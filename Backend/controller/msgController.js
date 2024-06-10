const Chat = require('../models/chatModel');
const Message = require('../models/msgModel');
const User = require('../models/userModel');
const mongoose= require("mongoose");

exports.getMsg = async (req, res) => {
  const { chatId } = req.body;
  const userId = req.user.id;

  try {
    // Find the chat by ID
    const chat = await Chat.findById(chatId)
      .populate('members', 'username profilePic')
      .populate('admin', 'username profilePic')
      .exec();

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    // Find all messages of the chat
    const messages = await Message.find({ chat: chatId })
      .populate('sender', 'username profilePic')
      .sort({ createdAt: 1 }) // Sort messages by timestamp
      .exec();

    // Prepare the response data
    const responseData = {
      _id: chat._id,
      isGrpChat: chat.isGrpChat,
      selfId:userId,
      otherUserId: chat.isGrpChat ? null : chat.members.find(member => member._id.toString() !== userId)._id,
      otherUsername: chat.isGrpChat ? null : chat.members.find(member => member._id.toString() !== userId).username,
      otherUserProfilePic: chat.isGrpChat ? null : chat.members.find(member => member._id.toString() !== userId).profilePic,
      grpProfilePic: chat.isGrpChat ? chat.grpProfilePic : null,
      grpName: chat.isGrpChat ? chat.chatName : null,
      members: chat.isGrpChat ? chat.members : null,
      admin: chat.isGrpChat ? chat.admin : null,
      messages: messages,
    };

    // Send the response
    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



exports.sendMessage = async (req, res) => {
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
  
      res.status(201).json(savedMessage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };