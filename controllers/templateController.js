const Template = require("../models/Template");

// Get all templates
const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find({
      userId: req.user.userId,
    });

    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create template
const createTemplate = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const template = await Template.create({
      userId: req.user.userId,
      title,
      content,
      category,
    });

    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update template
const updateTemplate = async (req, res) => {
  try {
    const template = await Template.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!template) {
      return res.status(404).json({
        message: "Template not found",
      });
    }

    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete template
const deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!template) {
      return res.status(404).json({
        message: "Template not found",
      });
    }

    res.status(200).json({
      message: "Template deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
};