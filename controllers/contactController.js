const Contact = require("../models/Contact");
const csv = require("csv-parser");
const fs = require("fs");

// =======================
// Get Contacts
// =======================

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

// =======================
// Create Contact
// =======================

const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const exists = await Contact.findOne({
      userId: req.user.userId,
      phone,
    });

    if (exists) {
      return res.status(400).json({
        message: "Phone number already exists",
      });
    }

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

// =======================
// Bulk CSV Import
// =======================

const importContacts = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "CSV file is required",
      });
    }

    const contacts = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {

        contacts.push({
          userId: req.user.userId,
          name: row.name || "",
          email: row.email || "",
          phone: row.phone || "",
        });

      })

      .on("end", async () => {

        try {

          const existing = await Contact.find({
            userId: req.user.userId,
          });

          const existingPhones = existing.map(c => c.phone);

          const newContacts = contacts.filter(
            c =>
              c.phone &&
              !existingPhones.includes(c.phone)
          );

          if (newContacts.length > 0) {
            await Contact.insertMany(newContacts);
          }

          fs.unlinkSync(req.file.path);

          res.json({
            message: `${newContacts.length} contacts imported successfully`,
          });

        } catch (err) {

          res.status(500).json({
            message: err.message,
          });

        }

      });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// =======================
// Update Contact
// =======================

const updateContact = async (req, res) => {

  try {

    const contact = await Contact.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!contact) {

      return res.status(404).json({
        message: "Contact not found",
      });

    }

    res.json(contact);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// =======================
// Delete Contact
// =======================

const deleteContact = async (req, res) => {

  try {

    const contact = await Contact.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!contact) {

      return res.status(404).json({
        message: "Contact not found",
      });

    }

    res.json({
      message: "Contact deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {

  getContacts,
  createContact,
  importContacts,
  updateContact,
  deleteContact,
  importContacts,

};