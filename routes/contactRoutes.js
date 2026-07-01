const express = require("express");
const router = express.Router();

const multer = require("multer");

const upload = multer({
  dest: "uploads/",
});

const authMiddleware = require("../middleware/authMiddleware");

const {
  getContacts,
  createContact,
  importContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

// ========================
// Multer Storage
// ========================


// ========================
// Routes
// ========================

router.get("/", authMiddleware, getContacts);

router.post("/", authMiddleware, createContact);

// Bulk CSV Import
router.post(
  "/import",
  authMiddleware,
  upload.single("file"),
  importContacts
);

router.put("/:id", authMiddleware, updateContact);

router.delete("/:id", authMiddleware, deleteContact);

module.exports = router;