const express = require("express");
const router = express.Router();

const {
  getAnalytics,
  updateAnalytics,
} = require("../controllers/analyticsController");

// GET Analytics
router.get("/", getAnalytics);

// UPDATE Analytics
router.put("/", updateAnalytics);

module.exports = router;