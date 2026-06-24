const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getTemplates,
  createTemplate,
} = require("../controllers/templateController");

router.get("/", authMiddleware, getTemplates);

router.post("/", authMiddleware, createTemplate);

module.exports = router;
