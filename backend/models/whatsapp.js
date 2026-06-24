const mongoose = require("mongoose");

const whatsappSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Sent", "Failed"],
      default: "Pending",
    },
    messageId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WhatsApp", whatsappSchema);