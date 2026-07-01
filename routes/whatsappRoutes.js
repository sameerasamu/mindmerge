const express = require("express");

const router = express.Router();

const whatsappService = require("../services/whatsappService");

router.get("/qr", (req, res) => {
  res.json({
    qr: whatsappService.getQRCode(),
    status: whatsappService.getStatus(),
  });
});

router.get("/status", (req, res) => {
  res.json({
    status: whatsappService.getStatus(),
    phoneNumber: whatsappService.getPhoneNumber(),
  });
});

router.post("/send", async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
      return res.status(400).json({
        success: false,
        message: "Phone number and message are required",
      });
    }

    const client = whatsappService.getClient();

    await client.sendMessage(`${phoneNumber}@c.us`, message);

    res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;