const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  scheduledTime: {
    type: Date,
    required: true,
  },

  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model(
  "Schedule",
  scheduleSchema
);