const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getCampaigns,
  createCampaign,
  getCampaign,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaignController");

router.get("/", authMiddleware, getCampaigns);

router.post("/", authMiddleware, createCampaign);

router.get("/:id", authMiddleware, getCampaign);

router.put("/:id", authMiddleware, updateCampaign);

router.delete("/:id", authMiddleware, deleteCampaign);

module.exports = router;