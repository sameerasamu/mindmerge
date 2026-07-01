const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    campaignName: {
      type: String,
      required: true,
    },
    totalSent: {
      type: Number,
      default: 0,
    },
    delivered: {
      type: Number,
      default: 0,
    },
    failed: {
      type: Number,
      default: 0,
    },
    read: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", reportSchema);