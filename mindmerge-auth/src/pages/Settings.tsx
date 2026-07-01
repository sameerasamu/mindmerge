import { useEffect, useState } from "react";

export default function Settings() {
  const token = localStorage.getItem("token");

  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/settings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setTheme(data.theme || "light");
      setNotifications(data.notifications);
    } catch (error) {
      console.log(error);
      alert("Failed to load settings");
    }
  };

  const saveSettings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          theme,
          notifications,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
      } else {
        alert("Unable to save settings");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold mb-2">
        Settings
      </h1>

      <p className="text-gray-400 mb-8">
        Configure your preferences
      </p>

      <div className="bg-slate-900 rounded-xl p-6 mb-6">

        <h2 className="text-2xl font-bold mb-4">
          Notifications
        </h2>

        <div className="flex justify-between items-center">

          <span>Enable Notifications</span>

          <input
            type="checkbox"
            checked={notifications}
            onChange={() =>
              setNotifications(!notifications)
            }
          />

        </div>

      </div>

      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-4">
          Theme
        </h2>

        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="bg-slate-800 p-3 rounded w-full mb-6"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <button
          onClick={saveSettings}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold"
        >
          Save Settings
        </button>

      </div>

    </div>
  );
}