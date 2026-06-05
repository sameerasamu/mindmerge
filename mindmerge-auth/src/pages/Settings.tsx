import { useState } from "react";

export default function Settings() {
  const [campaignComplete, setCampaignComplete] = useState(true);
  const [failedMessages, setFailedMessages] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const [theme, setTheme] = useState("dark");

  const [twoFactor, setTwoFactor] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");

  const handleSave = () => {
    alert("Settings Saved Successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-2">
        Settings
      </h1>

      <p className="text-gray-400 mb-8">
        Configure your workspace preferences
      </p>

      {/* Notifications */}
      <div className="bg-slate-900 p-6 rounded-xl mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Notifications
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between">
            <div>
              <h3>Campaign Completions</h3>
              <p className="text-gray-400 text-sm">
                When a campaign finishes
              </p>
            </div>

            <input
              type="checkbox"
              checked={campaignComplete}
              onChange={() =>
                setCampaignComplete(!campaignComplete)
              }
            />
          </div>

          <div className="flex justify-between">
            <div>
              <h3>Failed Messages</h3>
              <p className="text-gray-400 text-sm">
                When deliveries fail
              </p>
            </div>

            <input
              type="checkbox"
              checked={failedMessages}
              onChange={() =>
                setFailedMessages(!failedMessages)
              }
            />
          </div>

          <div className="flex justify-between">
            <div>
              <h3>Weekly Digest</h3>
              <p className="text-gray-400 text-sm">
                Summary every Monday
              </p>
            </div>

            <input
              type="checkbox"
              checked={weeklyDigest}
              onChange={() =>
                setWeeklyDigest(!weeklyDigest)
              }
            />
          </div>

          <div className="flex justify-between">
            <div>
              <h3>Marketing Emails</h3>
            </div>

            <input
              type="checkbox"
              checked={marketingEmails}
              onChange={() =>
                setMarketingEmails(!marketingEmails)
              }
            />
          </div>

        </div>
      </div>

      {/* Theme */}
      <div className="bg-slate-900 p-6 rounded-xl mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Theme
        </h2>

        <p className="text-gray-400 mb-4">
          Customize appearance
        </p>

        <label className="block mb-2">
          Color Mode
        </label>

        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="bg-slate-800 p-3 rounded w-full"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* Security */}
      <div className="bg-slate-900 p-6 rounded-xl mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Security
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span>
              Two-Factor Authentication
            </span>

            <input
              type="checkbox"
              checked={twoFactor}
              onChange={() =>
                setTwoFactor(!twoFactor)
              }
            />
          </div>

          <div className="flex justify-between">
            <span>Login Alerts</span>

            <input
              type="checkbox"
              checked={loginAlerts}
              onChange={() =>
                setLoginAlerts(!loginAlerts)
              }
            />
          </div>

          <input
            type="password"
            placeholder="Current Password"
            className="w-full p-3 rounded bg-slate-800"
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 rounded bg-slate-800"
          />

          <button className="bg-green-500 text-black px-4 py-2 rounded">
            Update Password
          </button>

        </div>
      </div>

      {/* Timezone */}
      <div className="bg-slate-900 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">
          Timezone
        </h2>

        <label className="block mb-2">
          Timezone
        </label>

        <select
          value={timezone}
          onChange={(e) =>
            setTimezone(e.target.value)
          }
          className="bg-slate-800 p-3 rounded w-full mb-4"
        >
          <option>Asia/Kolkata</option>
          <option>Asia/Dubai</option>
          <option>Europe/London</option>
          <option>America/New_York</option>
        </select>

        <label className="block mb-2">
          Date Format
        </label>

        <select
          value={dateFormat}
          onChange={(e) =>
            setDateFormat(e.target.value)
          }
          className="bg-slate-800 p-3 rounded w-full mb-6"
        >
          <option>DD/MM/YYYY</option>
          <option>MM/DD/YYYY</option>
          <option>YYYY-MM-DD</option>
        </select>

        <button
          onClick={handleSave}
          className="bg-green-500 text-black px-6 py-3 rounded font-bold"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}