const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// Signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If already verified, block signup
      if (existingUser.isVerified) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      // If not verified, generate and resend a new OTP
      const otp = Math.floor(
        1000000 + Math.random() * 9000000
      ).toString();

      existingUser.otp = otp;
      existingUser.otpExpiry = Date.now() + 10 * 60 * 1000;

      await existingUser.save();

      await sendEmail(email, otp);

      return res.status(200).json({
        message: "Account exists but not verified. New OTP sent.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate 7-digit OTP
    const otp = Math.floor(
      1000000 + Math.random() * 9000000
    ).toString();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000,
    });

    await user.save();

    console.log("Sending OTP to:", email);

    await sendEmail(email, otp);

    console.log("OTP sent successfully");

    res.status(201).json({
      message: "Signup successful. OTP sent to email.",
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);

    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

// Verify OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Resend OTP
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    const otp = Math.floor(
      1000000 + Math.random() * 9000000
    ).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    console.log("Resending OTP to:", email);

    await sendEmail(email, otp);

    console.log("OTP resent successfully");

    res.status(200).json({
      message: "New OTP sent successfully",
    });
  } catch (error) {
    console.error("RESEND OTP ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your email first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "User",
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Login Error",
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  verifyOtp,
  resendOtp,
};