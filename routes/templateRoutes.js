const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} = require("../controllers/templateController");

router.get("/", authMiddleware, getTemplates);

router.post("/", authMiddleware, createTemplate);

router.put("/:id", authMiddleware, updateTemplate);

router.delete("/:id", authMiddleware, deleteTemplate);

module.exports = router;