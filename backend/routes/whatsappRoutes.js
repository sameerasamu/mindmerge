const express = require("express");

const {
  getMessages,
  sendMessage,
  getMessageById,
  deleteMessage,
} = require("../controllers/whatsappController");

const router = express.Router();

// Get all WhatsApp messages
router.get("/", getMessages);

// Send/Create a WhatsApp message
router.post("/", sendMessage);

// Get message by ID
router.get("/:id", getMessageById);

// Delete message
router.delete("/:id", deleteMessage);

module.exports = router;