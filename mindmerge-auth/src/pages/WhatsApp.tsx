import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Smartphone, Send } from "lucide-react";

import { createSchedule } from "../api/scheduleApi";
import { sendWhatsAppMessage } from "../api/whatsappApi";

export default function WhatsApp() {
  // Schedule
  const [campaignName, setCampaignName] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  // Send Message
  const [receiverNumber, setReceiverNumber] = useState("");
  const [message, setMessage] = useState("");

  // WhatsApp Status
  const [qrImage, setQrImage] = useState("");
  const [connectionStatus, setConnectionStatus] =
    useState("Loading...");

  // Device Details
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessName] = useState("MindMerge Business");

  // Loading
  const [sending, setSending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Next Schedule
  const nextSchedule = useMemo(() => {
    if (!scheduleTime) return "-";

    return new Date(scheduleTime).toLocaleString();
  }, [scheduleTime]);
    // Load QR Code
  const loadQRCode = async () => {
    try {
      setRefreshing(true);

      const response = await fetch(
        "http://localhost:5000/api/whatsapp/qr"
      );

      const data = await response.json();

      if (data.status === "Connected") {
        setConnectionStatus("Connected");
        setQrImage("");
      } else {
        setConnectionStatus(data.status || "Disconnected");
        setQrImage(data.qr || "");
      }
    } catch (error) {
      console.log(error);
      setConnectionStatus("Offline");
    } finally {
      setRefreshing(false);
    }
  };

  // Sync WhatsApp Status
  useEffect(() => {
    const syncStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/whatsapp/status"
        );

        const data = await response.json();

        setConnectionStatus(data.status || "Disconnected");

        if (data.phoneNumber) {
          setPhoneNumber(data.phoneNumber);
        }

        if (data.status === "Connected") {
          setQrImage("");
        }
      } catch (error) {
        console.log(error);
      }
    };

    syncStatus();

    const interval = setInterval(syncStatus, 3000);

    return () => clearInterval(interval);
  }, []);

  // Refresh QR automatically until connected
  useEffect(() => {
    if (connectionStatus === "Connected") return;

    loadQRCode();

    const interval = setInterval(loadQRCode, 5000);

    return () => clearInterval(interval);
  }, [connectionStatus]);

  // Schedule Campaign
  const handleSchedule = async () => {
    if (!campaignName || !scheduleTime) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await createSchedule({
        campaignName,
        scheduleTime,
      });

      alert("Campaign scheduled successfully!");

      setCampaignName("");
      setScheduleTime("");
    } catch (error) {
      console.log(error);
      alert("Failed to schedule campaign.");
    }
  };

  // Send WhatsApp Message
  const handleSendMessage = async () => {
    if (!receiverNumber || !message) {
      alert("Please enter phone number and message.");
      return;
    }

    try {
      setSending(true);

      const result = await sendWhatsAppMessage(
        receiverNumber,
        message
      );

      if (result.success) {
        alert("Message sent successfully!");

        setReceiverNumber("");
        setMessage("");
      } else {
        alert(result.message || "Failed to send message.");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  return (
        <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-800 rounded-xl p-5">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">Connection</p>

            <div
              className={`w-3 h-3 rounded-full ${
                connectionStatus === "Connected"
                  ? "bg-green-500 animate-pulse"
                  : "bg-yellow-500 animate-pulse"
              }`}
            ></div>
          </div>

          <h2
            className={`text-3xl font-bold mt-3 ${
              connectionStatus === "Connected"
                ? "text-green-400"
                : "text-yellow-400"
            }`}
          >
            {connectionStatus}
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Live WhatsApp Session
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-5">
          <p className="text-gray-400">Business</p>

          <h2 className="text-2xl font-bold text-blue-400 mt-2">
            {businessName}
          </h2>
        </div>

        <div className="bg-slate-800 rounded-xl p-5">
          <p className="text-gray-400">Linked Device</p>

          <h2 className="text-xl font-bold text-green-400 mt-2">
            {phoneNumber || "Not Connected"}
          </h2>
        </div>

        <div className="bg-slate-800 rounded-xl p-5">
          <p className="text-gray-400">Upcoming Campaign</p>

          <h2 className="text-lg font-bold text-pink-400 mt-2">
            {nextSchedule}
          </h2>
        </div>

      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              💬 WhatsApp Manager
            </h1>

            <p className="text-gray-400 mt-2">
              Connect, monitor and send WhatsApp messages
            </p>
          </div>

          <button
            onClick={loadQRCode}
            disabled={refreshing}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg flex items-center gap-2"
          >
            <RefreshCw
              size={18}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT PANEL */}
          <div className="bg-slate-800 rounded-xl p-6 flex flex-col items-center">

            {connectionStatus === "Connected" ? (

              <div className="text-center py-10">

                <div className="text-6xl">✅</div>

                <h2 className="text-2xl font-bold text-green-400 mt-4">
                  WhatsApp Connected
                </h2>

                <p className="text-gray-400 mt-2">
                  Device authenticated successfully.
                </p>

              </div>

            ) : qrImage ? (

              <img
                src={qrImage}
                alt="QR Code"
                className="w-72 h-72 bg-white rounded-xl p-4"
              />

            ) : (

              <div className="py-24 text-gray-400">
                Generating QR...
              </div>

            )}

            <h2 className="text-2xl font-bold mt-6">
              Scan QR Code
            </h2>

            <p className="text-center text-gray-400 mt-3">
              Open WhatsApp
              <br />
              Linked Devices
              <br />
              Link a Device
            </p>

          </div>
                    {/* RIGHT PANEL */}
          <div className="bg-slate-800 rounded-xl p-6">

            {/* Device Information */}
            <div className="bg-slate-900 rounded-xl border border-slate-700 p-5 mb-8">

              <div className="flex items-center gap-4">

                <div className="bg-green-600 p-4 rounded-full">
                  <Smartphone size={30} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    {phoneNumber || "No Device Connected"}
                  </h2>

                  <p className="text-gray-400">
                    {businessName}
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">

                <div>
                  <p className="text-gray-400 text-sm">
                    Status
                  </p>

                  <p className="font-semibold text-green-400">
                    {connectionStatus}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Connection
                  </p>

                  <p className="font-semibold">
                    WhatsApp Web
                  </p>
                </div>

              </div>

            </div>

            {/* Send Message */}

            <h3 className="text-xl font-bold mb-4">
              Send WhatsApp Message
            </h3>

            <input
              type="text"
              placeholder="Receiver Phone Number (Example: 919876543210)"
              value={receiverNumber}
              onChange={(e) => setReceiverNumber(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 mb-4"
            />

            <textarea
              rows={4}
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 mb-4"
            />

            <button
              onClick={handleSendMessage}
              disabled={sending}
              className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 mb-8"
            >
              <Send size={20} />

              {sending ? "Sending..." : "Send Message"}
            </button>

            <hr className="border-slate-600 mb-8" />

            {/* Schedule Campaign */}

            <h3 className="text-xl font-bold mb-4">
              Schedule Campaign
            </h3>

            <input
              type="text"
              placeholder="Campaign Name"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 mb-4"
            />

            <input
              type="datetime-local"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 mb-4"
            />

            {scheduleTime && (
              <p className="text-sm text-gray-400 mb-4">
                Scheduled For:
                <span className="ml-2 text-green-400">
                  {nextSchedule}
                </span>
              </p>
            )}

            <button
              onClick={handleSchedule}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold"
            >
              Schedule Campaign
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}