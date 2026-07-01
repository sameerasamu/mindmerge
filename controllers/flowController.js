const Flow = require("../models/Flow");

const createFlow = async (req, res) => {
  try {
    const { title, description } = req.body;

    const flow = new Flow({
      title,
      description,
      user: req.user.userId,
    });

    await flow.save();

    res.status(201).json({
      message: "Flow Created Successfully",
      flow,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Creating Flow",
      error: error.message,
    });
  }
};

const getMyFlows = async (req, res) => {
  try {
    const flows = await Flow.find({
      user: req.user.userId,
    });

    res.status(200).json(flows);
  } catch (error) {
    res.status(500).json({
      message: "Error Fetching Flows",
      error: error.message,
    });
  }
};

const deleteFlow = async (req, res) => {
  try {
    const flow = await Flow.findById(req.params.id);

    if (!flow) {
      return res.status(404).json({
        message: "Flow not found",
      });
    }

    await Flow.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Flow Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Deleting Flow",
      error: error.message,
    });
  }
};

const updateFlow = async (req, res) => {
  try {
    const { title, description } = req.body;

    const flow = await Flow.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
      },
      {
        new: true,
      }
    );

    if (!flow) {
      return res.status(404).json({
        message: "Flow not found",
      });
    }

    res.status(200).json({
      message: "Flow Updated Successfully",
      flow,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Updating Flow",
      error: error.message,
    });
  }
};

module.exports = {
  createFlow,
  getMyFlows,
  deleteFlow,
  updateFlow,
};