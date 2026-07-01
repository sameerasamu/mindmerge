const express = require("express");
const cors = require("cors");
require("dotenv").config();

// ===== DEBUG =====
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS ? "Loaded Successfully" : "Missing"
);
// =================

const connectDB = require("./config/db");

// Scheduler
require("./services/scheduler");

// Routes
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const flowRoutes = require("./routes/flowRoutes");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const contactRoutes = require("./routes/contactRoutes");
const templateRoutes = require("./routes/templateRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const whatsappRoutes = require("./routes/whatsappRoutes");
const profileRoutes = require("./routes/profileRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const reportRoutes = require("./routes/reportRoutes");
const campaignScheduler = require("./services/campaignScheduler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/flows", flowRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/whatsapp", whatsappRoutes);
app.use("/api/users", profileRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/reports", reportRoutes);

// Analytics Test Route
app.get("/test-analytics", (req, res) => {
  res.json({
    success: true,
    message: "Analytics Route Loaded Successfully",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    campaignScheduler.checkScheduledCampaigns();

    setInterval(() => {
      campaignScheduler.checkScheduledCampaigns();
    }, 60000);
  } catch (error) {
    console.error("Database Connection Failed:", error);
  }
};

startServer();