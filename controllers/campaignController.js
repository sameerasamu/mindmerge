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
    const {
      name, 
      audience,
      message,
      status,
      scheduleDate,
      scheduleTime,
    } = req.body;

    const campaign = await Campaign.create({
      userId: req.user.userId,
      name,
      audience,
      message,
      status,
      scheduleDate,
      scheduleTime,
    });

    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get single campaign
const getCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    res.json(campaign);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update campaign
const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    res.json(campaign);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete campaign
const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    res.json({
      message: "Campaign deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCampaigns,
  createCampaign,
  getCampaign,
  updateCampaign,
  deleteCampaign,
};