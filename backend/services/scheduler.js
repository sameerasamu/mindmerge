const cron = require("node-cron");
const Schedule = require("../models/Schedule");

// Runs every minute
cron.schedule("* * * * *", async () => {
  console.log("Checking scheduled messages...");

  try {
    const pendingMessages = await Schedule.find({
      status: "pending",
      scheduledTime: { $lte: new Date() },
    });

    for (const message of pendingMessages) {
      console.log(
        `Sending message to ${message.phone}: ${message.message}`
      );

      // Later we will connect WhatsApp here

      message.status = "sent";
      await message.save();
    }
  } catch (error) {
    console.log("Scheduler Error:", error.message);
  }
});

module.exports = {};