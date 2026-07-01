const Settings = require("../models/Settings");

// Get Settings
const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({
      userId: req.user.userId,
    });

    if (!settings) {
      settings = await Settings.create({
        userId: req.user.userId,
      });
    }

    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Settings
const updateSettings = async (req, res) => {
  try {
    const { theme, notifications } = req.body;

    let settings = await Settings.findOne({
      userId: req.user.userId,
    });

    if (!settings) {
      settings = await Settings.create({
        userId: req.user.userId,
        theme,
        notifications,
      });
    } else {
      settings.theme = theme;
      settings.notifications = notifications;

      await settings.save();
    }

    res.status(200).json({
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};