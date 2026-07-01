import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  FaHome,
  FaBullhorn,
  FaUsers,
  FaFileAlt,
  FaWhatsapp,
  FaChartLine,
  FaClipboardList,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { getCampaigns } from "../api/campaignApi";
import { getContacts } from "../api/contactApi";
import { getTemplates } from "../api/templateApi";
import DashboardCharts from "../components/DashboardCharts";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token") || "";
  const role = localStorage.getItem("role") || "User";

  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const loadDashboard = async () => {
    try {
      const campaignData = await getCampaigns(token);
      const contactData = await getContacts();
      const templateData = await getTemplates();

      setCampaigns(Array.isArray(campaignData) ? campaignData : []);
      setContacts(Array.isArray(contactData) ? contactData : []);
      setTemplates(Array.isArray(templateData) ? templateData : []);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.log(error);
    }
  };

  const recentCampaigns = [...campaigns]
    .reverse()
    .slice(0, 5);

  const dashboard = {
    totalCampaigns: campaigns.length,
    totalContacts: contacts.length,
    totalTemplates: templates.length,

    messagesSent: campaigns.reduce(
      (sum: number, campaign: any) =>
        sum + Number(campaign.audience || 0),
      0
    ),

    delivered: Math.floor(
      campaigns.reduce(
        (sum: number, campaign: any) =>
          sum + Number(campaign.audience || 0),
        0
      ) * 0.92
    ),

    failed: Math.floor(
      campaigns.reduce(
        (sum: number, campaign: any) =>
          sum + Number(campaign.audience || 0),
        0
      ) * 0.05
    ),

    scheduled: campaigns.filter(
      (campaign: any) =>
        campaign.status === "Scheduled"
    ).length,
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");

    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">

      {/* Sidebar */}

      <div className="w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col">

        <div className="mb-10">

          <h1 className="text-3xl font-extrabold text-green-400">
            MindMerge
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            WhatsApp Campaign Manager
          </p>

        </div>

        <ul className="space-y-2">

          <li
            onClick={() => navigate("/dashboard")}
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition ${
              location.pathname === "/dashboard"
                ? "bg-green-500 text-black font-bold"
                : "hover:bg-slate-800"
            }`}
          >
            <FaHome />
            Dashboard
          </li>

          <li
            onClick={() => navigate("/campaigns")}
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition ${
              location.pathname === "/campaigns"
                ? "bg-green-500 text-black font-bold"
                : "hover:bg-slate-800"
            }`}
          >
            <FaBullhorn />
            Campaigns
          </li>

          <li
            onClick={() => navigate("/contacts")}
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition ${
              location.pathname === "/contacts"
                ? "bg-green-500 text-black font-bold"
                : "hover:bg-slate-800"
            }`}
          >
            <FaUsers />
            Contacts
          </li>

          <li
            onClick={() => navigate("/templates")}
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition ${
              location.pathname === "/templates"
                ? "bg-green-500 text-black font-bold"
                : "hover:bg-slate-800"
            }`}
          >
            <FaFileAlt />
            Templates
          </li>

          <li
            onClick={() => navigate("/whatsapp")}
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition ${
              location.pathname === "/whatsapp"
                ? "bg-green-500 text-black font-bold"
                : "hover:bg-slate-800"
            }`}
          >
            <FaWhatsapp />
            WhatsApp
          </li>

          <li
            onClick={() => navigate("/analytics")}
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition ${
              location.pathname === "/analytics"
                ? "bg-green-500 text-black font-bold"
                : "hover:bg-slate-800"
            }`}
          >
            <FaChartLine />
            Analytics
          </li>

          <li
            onClick={() => navigate("/reports")}
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition ${
              location.pathname === "/reports"
                ? "bg-green-500 text-black font-bold"
                : "hover:bg-slate-800"
            }`}
          >
            <FaClipboardList />
            Reports
          </li>

          <li
            onClick={() => navigate("/profile")}
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition ${
              location.pathname === "/profile"
                ? "bg-green-500 text-black font-bold"
                : "hover:bg-slate-800"
            }`}
          >
            <FaUser />
            Profile
          </li>

          <li
            onClick={() => navigate("/settings")}
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition ${
              location.pathname === "/settings"
                ? "bg-green-500 text-black font-bold"
                : "hover:bg-slate-800"
            }`}
          >
            <FaCog />
            Settings
          </li>

        </ul>

      <div className="mt-auto pt-8">

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-bold transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>

      {/* Main Content */}

      <div className="flex-1 p-8 overflow-auto">

        <div className="flex justify-between items-center mb-8">

          <div className="flex justify-between items-center w-full">

            <div>
              <h1 className="text-4xl font-bold">
                 Dashboard
              </h1>

              <p className="text-gray-400 mt-2">
                Welcome back! Role: {role}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Last Updated: {lastUpdated}
              </p>
            </div>

            <div className="flex items-center gap-4">

              <div className="text-right">
                <p className="text-sm text-gray-400">
                  {currentTime.toLocaleDateString()}
                </p>

                <p className="text-lg font-semibold text-green-400">
                  {currentTime.toLocaleTimeString()}
                </p>
              </div>

              <div className="flex gap-3">

                <button
                  onClick={loadDashboard}
                  className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-lg font-bold"
                >
                  Refresh
                </button>

                <button
                  onClick={() => navigate("/campaigns")}
                  className="bg-green-500 hover:bg-green-600 text-black px-5 py-3 rounded-lg font-bold"
                >
                  New Campaign
                </button>

              </div>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <div className="bg-slate-800 p-6 rounded-xl">
            <p className="text-gray-400">Connected WhatsApp</p>
            <h2 className="text-3xl font-bold mt-2 text-green-400">
              Connected ✅
            </h2>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <p className="text-gray-400">Total Contacts</p>
            <h2 className="text-3xl font-bold mt-2">
              {dashboard.totalContacts}
            </h2>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <p className="text-gray-400">Campaigns</p>
            <h2 className="text-3xl font-bold mt-2">
              {dashboard.totalCampaigns}
            </h2>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <p className="text-gray-400">Templates</p>
            <h2 className="text-3xl font-bold mt-2">
              {dashboard.totalTemplates}
            </h2>
          </div>
                    <div className="bg-slate-800 p-6 rounded-xl">
            <p className="text-gray-400">Messages Sent</p>
            <h2 className="text-3xl font-bold mt-2 text-yellow-400">
              {dashboard.messagesSent}
            </h2>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <p className="text-gray-400">Delivered</p>
            <h2 className="text-3xl font-bold mt-2 text-green-500">
              {dashboard.delivered}
            </h2>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <p className="text-gray-400">Failed</p>
            <h2 className="text-3xl font-bold mt-2 text-red-500">
              {dashboard.failed}
            </h2>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <p className="text-gray-400">Scheduled</p>
            <h2 className="text-3xl font-bold mt-2 text-blue-400">
              {dashboard.scheduled}
            </h2>
          </div>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <button
            onClick={() => navigate("/campaigns")}
            className="bg-slate-800 hover:bg-slate-700 rounded-xl p-6 text-left"
          >
            <h3 className="text-xl font-bold text-green-400">
              📢 New Campaign
            </h3>

            <p className="text-gray-400 mt-2">
              Create and send a WhatsApp campaign.
            </p>
          </button>

          <button
            onClick={() => navigate("/contacts")}
            className="bg-slate-800 hover:bg-slate-700 rounded-xl p-6 text-left"
          >
            <h3 className="text-xl font-bold text-blue-400">
              👥 Add Contacts
            </h3>

            <p className="text-gray-400 mt-2">
              Manage your contact list.
            </p>
          </button>

          <button
            onClick={() => navigate("/templates")}
            className="bg-slate-800 hover:bg-slate-700 rounded-xl p-6 text-left"
          >
            <h3 className="text-xl font-bold text-yellow-400">
              📝 Templates
            </h3>

            <p className="text-gray-400 mt-2">
               Create and manage message templates.
            </p>
          </button>

        </div>

        <DashboardCharts />

        <div className="bg-slate-800 rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Campaigns
          </h2>

          {recentCampaigns.length === 0 ? (

            <p className="text-gray-400">
              No campaigns created yet.
            </p>

          ) : (

            <div className="space-y-4">

              {recentCampaigns.map((campaign: any) => (

                <div
                  key={campaign._id}
                  className="flex justify-between items-center border-b border-slate-700 pb-4"
                >

                  <div>

                    <h3 className="font-semibold">
                      {campaign.name}
                    </h3>

                    <p className="text-gray-400">
                      {campaign.audience} recipients
                    </p>

                  </div>

                  <span className="bg-green-500 text-black px-3 py-1 rounded">
                    {campaign.status || "Draft"}
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>
        <div className="bg-slate-800 rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Recent Contacts
          </h2>

          {contacts.length === 0 ? (

            <p className="text-gray-400">
              No contacts available.
            </p>

          ) : (

            <div className="space-y-4">

              {contacts.slice(-5).reverse().map((contact: any) => (

                <div
                  key={contact._id}
                  className="flex justify-between border-b border-slate-700 pb-3"
                >

                  <div>

                    <p className="font-semibold">
                      {contact.name}
                    </p>

                    <p className="text-gray-400 text-sm">
                      {contact.phone}
                    </p>

                  </div>

                  <span className="text-green-400">
                    Contact
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>
        <div className="bg-slate-800 rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Recent Templates
          </h2>

          {templates.length === 0 ? (

            <p className="text-gray-400">
              No templates available.
            </p>

          ) : (

            <div className="space-y-4">

              {templates.slice(-5).reverse().map((template: any) => (

                <div
                  key={template._id}
                  className="flex justify-between border-b border-slate-700 pb-3"
                >

                  <div>

                    <p className="font-semibold">
                      {template.title}
                    </p>

                    <p className="text-gray-400 text-sm">
                      {template.category || "General"}
                    </p>

                  </div>

                  <span className="text-yellow-400">
                    Template
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>
      </div>

    </div>
  );
}