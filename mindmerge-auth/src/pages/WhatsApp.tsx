import React from "react";
import { QrCode, RefreshCw, Smartphone } from "lucide-react";

export default function WhatsApp() {
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

            <h2 className="font-semibold text-lg text-white">
              Scan QR Code
            </h2>

            <p className="text-gray-400 text-center mt-2">
              Open WhatsApp → Linked Devices → Link a Device
            </p>

            <p className="text-sm text-gray-500 mt-4">
              QR refreshes every 60 seconds
            </p>

            <button className="flex items-center gap-2 mt-4 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 text-white">
              <RefreshCw size={18} />
              Refresh QR
            </button>
          </div>

          {/* Connection Details */}
          <div className="border border-gray-700 rounded-xl p-6 bg-gray-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>

              <h2 className="text-lg font-semibold text-white">
                Connected
              </h2>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Smartphone className="text-green-500" />

              <div>
                <p className="font-medium text-white">
                  +1 555 0100
                </p>

                <p className="text-gray-400">
                  MindMerge Biz
                </p>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Reconnect
              </button>

              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                Disconnect
              </button>
            </div>

            <h3 className="font-semibold mb-4 text-white">
              Session Details
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Battery</span>
                <span className="font-medium text-white">84%</span>
              </div>

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Plan</span>
                <span className="font-medium text-white">
                  Business Pro
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Last Sync
                </span>
                <span className="font-medium text-white">
                  2 min ago
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}