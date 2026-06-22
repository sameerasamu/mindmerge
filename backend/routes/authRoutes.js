const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  verifyOtp,
  resendOtp,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

module.exports = router;