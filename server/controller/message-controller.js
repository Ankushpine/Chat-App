const conversationModel = require("../model/conversation-model");
const messageModel = require("../model/message-model");
const { getReceiverSocketId, io } = require("../socket/socket");

module.exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // = const receiverId = req.params.id
    const senderId = req.user._id;

    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new messageModel({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]); // Both will run parallaly

    // SOCKET IO FUNCTIONALITY WILL GO HERE
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in Send Message Controller :: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await conversationModel
      .findOne({
        participants: { $all: [senderId, userToChatId] },
      })
      .populate("messages");

    if (!conversation) {
      return res.status(201).json([]);
    }

    const messages = conversation.messages;

    return res.status(201).json(messages);
  } catch (error) {
    console.log("Error in Get Message Controller :: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
