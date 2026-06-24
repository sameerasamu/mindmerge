const express = require("express");

const {
  getReports,
  createReport,
  getReportById,
  updateReport,
  deleteReport,
} = require("../controllers/reportController");

const router = express.Router();

// Get all reports
router.get("/", getReports);

// Create report
router.post("/", createReport);

// Get report by ID
router.get("/:id", getReportById);

// Update report
router.put("/:id", updateReport);

// Delete report
router.delete("/:id", deleteReport);

module.exports = router;