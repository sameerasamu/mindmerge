import React, { useState } from "react";
import { QrCode, RefreshCw, Smartphone } from "lucide-react";
import { createSchedule } from "../api/scheduleApi";

export default function WhatsApp() {
  const [campaignName, setCampaignName] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const handleSchedule = async () => {
    if (!campaignName || !scheduleTime) {
      alert("Please fill all fields");
      return;
    }

    try {
      const data = await createSchedule({
        campaignName,
        scheduleTime,
      });

      console.log(data);

      alert("Campaign Scheduled Successfully!");

      setCampaignName("");
      setScheduleTime("");
    } catch (error) {
      console.log(error);
      alert("Failed to schedule campaign");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">

      <div className="bg-gray-800 rounded-xl shadow-md p-6 border border-gray-700">

        <h1 className="text-2xl font-bold mb-2">
          WhatsApp Connection
        </h1>

        <p className="text-gray-400 mb-6">
          Link your WhatsApp Business account
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          {/* QR Section */}

          <div className="border border-gray-700 rounded-xl p-6 flex flex-col items-center bg-gray-800">

            <QrCode size={180} className="text-green-500 mb-4" />

            <h2 className="font-semibold text-lg">
              Scan QR Code
            </h2>

            <p className="text-gray-400 text-center mt-2">
              Open WhatsApp → Linked Devices → Link a Device
            </p>

            <p className="text-sm text-gray-500 mt-4">
              QR refreshes every 60 seconds
            </p>

            <button className="flex items-center gap-2 mt-4 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600">
              <RefreshCw size={18} />
              Refresh QR
            </button>

          </div>

          {/* Right Side */}

          <div className="border border-gray-700 rounded-xl p-6 bg-gray-800">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-3 h-3 bg-green-500 rounded-full"></div>

              <h2 className="text-lg font-semibold">
                Connected
              </h2>

            </div>

            <div className="flex items-center gap-3 mb-6">

              <Smartphone className="text-green-500" />

              <div>

                <p className="font-medium">
                  +1 555 0100
                </p>

                <p className="text-gray-400">
                  MindMerge Biz
                </p>

              </div>

            </div>

            <h3 className="font-semibold mb-4">
              Schedule Campaign
            </h3>

            <input
              type="text"
              placeholder="Campaign Name"
              value={campaignName}
              onChange={(e) =>
                setCampaignName(e.target.value)
              }
              className="w-full p-3 mb-4 rounded bg-gray-700"
            />

            <input
              type="datetime-local"
              value={scheduleTime}
              onChange={(e) =>
                setScheduleTime(e.target.value)
              }
              className="w-full p-3 mb-4 rounded bg-gray-700"
            />

            <button
              onClick={handleSchedule}
              className="w-full bg-green-600 py-3 rounded-lg font-bold hover:bg-green-700"
            >
              Schedule Campaign
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}