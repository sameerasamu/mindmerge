const Campaign = require("../models/Campaign");

// Get all campaigns
const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      userId: req.user.userId,
    });

    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create campaign
const createCampaign = async (req, res) => {
  try {
    const { name, audience, message, status } = req.body;

    const campaign = await Campaign.create({
      userId: req.user.userId,
      name,
      audience,
      message,
      status,
    });

    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCampaigns,
  createCampaign,
};