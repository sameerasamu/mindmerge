const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createFlow,
  getMyFlows,
  deleteFlow,
  updateFlow,
} = require("../controllers/flowController");

router.post("/create", authMiddleware, createFlow);

router.get("/myflows", authMiddleware, getMyFlows);

router.delete("/:id", authMiddleware, deleteFlow);

router.put("/:id", authMiddleware, updateFlow);

module.exports = router;