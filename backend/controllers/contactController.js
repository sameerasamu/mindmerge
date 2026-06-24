const Contact = require("../models/Contact");

// Get all contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({
      userId: req.user.userId,
    });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create contact
const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const contact = await Contact.create({
      userId: req.user.userId,
      name,
      email,
      phone,
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getContacts,
  createContact,
};