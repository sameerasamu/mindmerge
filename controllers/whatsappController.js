const WhatsApp = require("../models/WhatsApp");

// Get all messages
const getMessages = async (req, res) => {
  try {
    const messages = await WhatsApp.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Send/Create message
const sendMessage = async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;

    const whatsapp = await WhatsApp.create({
      phoneNumber,
      message,
      status: "Sent",
    });

    res.status(201).json({
      success: true,
      data: whatsapp,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get message by ID
const getMessageById = async (req, res) => {
  try {
    const message = await WhatsApp.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete message
const deleteMessage = async (req, res) => {
  try {
    const message = await WhatsApp.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMessages,
  sendMessage,
  getMessageById,
  deleteMessage,
};