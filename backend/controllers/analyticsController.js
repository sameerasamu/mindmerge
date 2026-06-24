const Analytics = require("../models/Analytics");

// Get Analytics
const getAnalytics = async (req, res) => {
  try {
    let analytics = await Analytics.findOne();

    if (!analytics) {
      analytics = await Analytics.create({});
    }

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
      error: error.message,
    });
  }
};

// Update Analytics
const updateAnalytics = async (req, res) => {
  try {
    let analytics = await Analytics.findOne();

    if (!analytics) {
      analytics = await Analytics.create(req.body);
    } else {
      analytics = await Analytics.findByIdAndUpdate(
        analytics._id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Analytics updated successfully",
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update analytics",
      error: error.message,
    });
  }
};

module.exports = {
  getAnalytics,
  updateAnalytics,
};