const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    totalContacts: {
      type: Number,
      default: 0,
    },
    totalCampaigns: {
      type: Number,
      default: 0,
    },
    messagesSent: {
      type: Number,
      default: 0,
    },
    messagesFailed: {
      type: Number,
      default: 0,
    },
    deliveredMessages: {
      type: Number,
      default: 0,
    },
    readMessages: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Analytics", analyticsSchema);