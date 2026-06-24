const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  changePassword,
} = require("../controllers/changePasswordController");

router.put("/", authMiddleware, changePassword);

module.exports = router;