const Campaign = require("../models/Campaign");
const Contact = require("../models/Contact");
const whatsappService = require("./whatsappService");

async function checkScheduledCampaigns() {
  console.log("Checking scheduled campaigns...");

  try {
    const now = new Date();

    const today = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().slice(0, 5);

    const campaigns = await Campaign.find({
      status: "Scheduled",
      scheduleDate: today,
      scheduleTime: currentTime,
    });

    const client = whatsappService.getClient();

    for (const campaign of campaigns) {
      try {
        const contacts = await Contact.find({
          userId: campaign.userId,
        });

        if (contacts.length === 0) {
          console.log(
            `No contacts found for campaign "${campaign.name}"`
          );
          continue;
        }

        for (const contact of contacts) {
          if (!contact.phone) continue;

          try {
            await client.sendMessage(
              `${contact.phone}@c.us`,
              campaign.message
            );

            console.log(
              `Message sent to ${contact.name} (${contact.phone})`
            );
          } catch (err) {
            console.log(
              `Failed to send to ${contact.phone}:`,
              err.message
            );
          }
        }

        campaign.status = "Completed";
        await campaign.save();

        console.log(
          `Campaign "${campaign.name}" completed successfully`
        );
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  checkScheduledCampaigns,
};