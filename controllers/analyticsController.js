const Campaign = require("../models/Campaign");
const Contact = require("../models/Contact");
const Template = require("../models/Template");

const getAnalytics = async (req, res) => {
  try {
    const totalCampaigns = await Campaign.countDocuments();

    const draft = await Campaign.countDocuments({
      status: "Draft",
    });

    const running = await Campaign.countDocuments({
      status: "Running",
    });

    const scheduled = await Campaign.countDocuments({
      status: "Scheduled",
    });

    const completed = await Campaign.countDocuments({
      status: "Completed",
    });

    const failed = await Campaign.countDocuments({
      status: "Failed",
    });

    const paused = await Campaign.countDocuments({
      status: "Paused",
    });

    const totalContacts = await Contact.countDocuments();

    const totalTemplates = await Template.countDocuments();

    const recentCampaigns = await Campaign.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalCampaigns,
      draft,
      running,
      scheduled,
      completed,
      failed,
      paused,
      totalContacts,
      totalTemplates,
      recentCampaigns,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAnalytics,
};