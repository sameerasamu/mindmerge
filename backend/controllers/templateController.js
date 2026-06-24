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
    const { title, content } = req.body;

    const template = await Template.create({
      userId: req.user.userId,
      title,
      content,
    });

    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getTemplates,
  createTemplate,
};