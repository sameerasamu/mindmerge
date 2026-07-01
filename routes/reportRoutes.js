const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getReports,
  createReport,
  getReportById,
  updateReport,
  deleteReport,
} = require("../controllers/reportController");

router.get("/", authMiddleware, getReports);
router.post("/", authMiddleware, createReport);
router.get("/:id", authMiddleware, getReportById);
router.put("/:id", authMiddleware, updateReport);
router.delete("/:id", authMiddleware, deleteReport);

module.exports = router;