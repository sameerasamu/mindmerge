const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getContacts,
  createContact,
} = require("../controllers/contactController");

router.get("/", authMiddleware, getContacts);

router.post("/", authMiddleware, createContact);

module.exports = router;