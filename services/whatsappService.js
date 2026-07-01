const { Client, LocalAuth } = require("whatsapp-web.js");
const QRCode = require("qrcode");

let qrImage = "";
let status = "Disconnected";
let phoneNumber = "";

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "mindmerge",
  }),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

client.on("qr", async (qr) => {
  console.log("QR Generated");

  qrImage = await QRCode.toDataURL(qr);

  status = "Waiting for Scan";
});

client.on("ready", async () => {
  console.log("WhatsApp Connected");

  status = "Connected";

  try {
    const info = client.info;

    if (info && info.wid) {
      phoneNumber = info.wid.user;
    }
  } catch (err) {
    console.log(err);
  }
});

client.on("authenticated", () => {
  console.log("Authenticated");
});

client.on("disconnected", () => {
  console.log("Disconnected");

  status = "Disconnected";

  qrImage = "";

  phoneNumber = "";
});

client.initialize();

module.exports = {
  getQRCode() {
    return qrImage;
  },

  getStatus() {
    return status;
  },

  getPhoneNumber() {
    return phoneNumber;
  },

  getClient() {
    return client;
  },
};