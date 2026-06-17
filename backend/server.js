const express = require("express");
const cors = require("cors");

require("dotenv").config();

const connectDB = require("./config/db");

// Scheduler
require("./services/scheduler");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const flowRoutes = require("./routes/flowRoutes");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/flows", flowRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/schedule", scheduleRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Database Connection
connectDB();

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});