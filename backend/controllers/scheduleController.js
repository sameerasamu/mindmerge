const Schedule = require("../models/Schedule");

const createSchedule = async (req, res) => {
  try {
    const { phone, message, scheduledTime } = req.body;

    const schedule = new Schedule({
      phone,
      message,
      scheduledTime,
    });

    await schedule.save();

    res.status(201).json({
      message: "Message scheduled successfully",
      schedule,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createSchedule };