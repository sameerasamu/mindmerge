const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getCampaigns,
  createCampaign,
} = require("../controllers/campaignController");

router.get("/", authMiddleware, getCampaigns);

router.post("/", authMiddleware, createCampaign);

module.exports = router;