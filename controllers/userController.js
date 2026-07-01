const User = require("../models/User");

// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error Fetching Profile",
      error: error.message,
    });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        name,
      },
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error Updating Profile",
      error: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};