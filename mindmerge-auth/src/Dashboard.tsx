import { useNavigate, useLocation } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role") || "User";

  const savedCampaigns = JSON.parse(
    localStorage.getItem("campaigns") || "[]"
  );

  const campaignCount = savedCampaigns.length;

  const recentCampaigns = savedCampaigns
    .slice(-5)
    .reverse();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">

      {/* Sidebar */}
      <div className="w-64 bg-slate-900 p-6 flex flex-col">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-400">
            MindMerge
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            WhatsApp Campaign Manager
          </p>
        </div>

        <ul className="space-y-3">

          <li
            onClick={() => navigate("/dashboard")}
            className={`cursor-pointer p-3 rounded-lg ${
              location.pathname === "/dashboard"
                ? "bg-green-500 text-black font-bold"
                : "hover:bg-slate-800"
            }`}
          >
            Dashboard
          </li>

          <li
            onClick={() => navigate("/campaigns")}
            className={`cursor-pointer p-3 rounded-lg ${
              location.pathname === "/campaigns"
                ? "bg-green-500 text-black font-bold"
                : "hover:bg-slate-800"
            }`}
          >
            Campaigns
          </li>

          <li
            onClick={() => navigate("/contacts")}
            className={`cursor-pointer p-3 rounded-lg ${
              location.pathname === "/contacts"
                ? "bg-green-500 text-black font-bold"
                : "hover:bg-slate-800"
            }`}
          >
            Contacts
          </li>

          <li
            onClick={() => navigate("/analytics")}
            className={`cursor-pointer p-3 rounded-lg ${
              location.pathname === "/analytics"
                ? "bg-green-500 text-black font-bold"
                : "hover:bg-slate-800"
            }`}
          >
            Analytics
          </li>

          <li
            onClick={() => navigate("/settings")}
            className={`cursor-pointer p-3 rounded-lg ${
              location.pathname === "/settings"
                ? "bg-green-500 text-black font-bold"
                : "hover:bg-slate-800"
            }`}
          >
            Settings
          </li>

        </ul>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 py-3 rounded-lg font-bold"
          >
            Logout
          </button>
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              Dashboard
            </h1>

            <p className="text-gray-400 mt-2">
              Role: {role}
            </p>
          </div>

          <button
            onClick={() => navigate("/campaigns")}
            className="bg-green-500 text-black px-5 py-3 rounded-lg font-bold"
          >
            New Campaign
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-gray-400">
              Connected WhatsApp
            </h3>

            <p className="text-3xl font-bold mt-2">
              1
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-gray-400">
              Total Contacts
            </h3>

            <p className="text-3xl font-bold mt-2">
              12480
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-gray-400">
              Campaigns
            </h3>

            <p className="text-3xl font-bold mt-2">
              {campaignCount}
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-gray-400">
              Messages Sent
            </h3>

            <p className="text-3xl font-bold mt-2">
              248320
            </p>
          </div>

        </div>

        <div className="bg-slate-800 rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Campaigns
          </h2>

          {recentCampaigns.length === 0 ? (
            <p>No campaigns created yet.</p>
          ) : (
            <div className="space-y-4">

              {recentCampaigns.map(
                (campaign: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <h3>{campaign.name}</h3>

                      <p className="text-gray-400">
                        {campaign.audience} recipients
                      </p>
                    </div>

                    <span className="bg-green-500 text-black px-3 py-1 rounded">
                      {campaign.status}
                    </span>
                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}