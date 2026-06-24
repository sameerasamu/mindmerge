const express = require("express");
const cors = require("cors");

require("dotenv").config();

const connectDB = require("./config/db");

// Scheduler
require("./services/scheduler");

const app = express();

// ====================== Middleware ======================
app.use(cors());
app.use(express.json());

// ====================== Route Imports ======================

// Authentication
const authRoutes = require("./routes/authRoutes");

// Protected Routes
const protectedRoutes = require("./routes/protectedRoutes");

// Users
const userRoutes = require("./routes/userRoutes");

// Notes
const noteRoutes = require("./routes/noteRoutes");

// Flows
const flowRoutes = require("./routes/flowRoutes");

// Schedule
const scheduleRoutes = require("./routes/scheduleRoutes");

// Contacts
const contactRoutes = require("./routes/contactRoutes");

// Campaigns
const campaignRoutes = require("./routes/campaignRoutes");

// Templates
const templateRoutes = require("./routes/templateRoutes");

// Change Password
const changePasswordRoutes = require("./routes/changePasswordRoutes");

// Settings
const settingsRoutes = require("./routes/settingsRoutes");

// Analytics
const analyticsRoutes = require("./routes/analyticsRoutes");

// Reports
const reportRoutes = require("./routes/reportRoutes");

// WhatsApp
const whatsappRoutes = require("./routes/whatsappRoutes");

// ====================== API Routes ======================

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/flows", flowRoutes);
app.use("/api/schedule", scheduleRoutes);

app.use("/api/contacts", contactRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/templates", templateRoutes);

app.use("/api/change-password", changePasswordRoutes);
app.use("/api/settings", settingsRoutes);

app.use("/api/analytics", analyticsRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/whatsapp", whatsappRoutes);

// ====================== Home Route ======================

app.get("/", (req, res) => {
  res.send("🚀 MindMerge Backend Running Successfully");
});

// ====================== Database ======================

connectDB();

// ====================== Server ======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});