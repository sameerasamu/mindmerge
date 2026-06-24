import { useState, useEffect } from "react";
import {
  createFlow,
  getMyFlows,
} from "../api/flowApi";

export default function Campaigns() {
  const [activeTab, setActiveTab] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [campaignName, setCampaignName] = useState("");
  const [audience, setAudience] = useState("");
  const [message, setMessage] = useState("");

  const [campaigns, setCampaigns] = useState<any[]>([]);

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getMyFlows(token);

        console.log(data);

        if (Array.isArray(data)) {
          setCampaigns(data);
        } else if (Array.isArray(data.flows)) {
          setCampaigns(data.flows);
        } else {
          setCampaigns([]);
        }
      } catch (error) {
        console.log(error);
        setCampaigns([]);
      }
    };

    fetchCampaigns();
  }, []);

  const filtered =
    activeTab === "All"
      ? campaigns
      : campaigns.filter(
          (item: any) =>
            (item.status || "Draft") === activeTab
        );

  const badgeColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "Running":
        return "bg-blue-500";
      case "Scheduled":
        return "bg-yellow-500 text-black";
      case "Draft":
        return "bg-gray-500";
      case "Paused":
        return "bg-orange-500";
      case "Failed":
        return "bg-red-500";
      default:
        return "bg-slate-600";
    }
  };

  const handleSaveCampaign = async () => {
    if (!campaignName || !audience || !message) {
      alert("Please fill all fields");
      return;
    }

    try {
      const newFlow = {
        name: campaignName,
        audience,
        message,
        status: "Draft",
      };

      const data = await createFlow(token, newFlow);

      console.log(data);

      setCampaigns((prev) => [
        ...prev,
        data.flow || newFlow,
      ]);

      alert("Campaign Created Successfully!");

      setCampaignName("");
      setAudience("");
      setMessage("");
      setShowForm(false);
    } catch (error) {
      console.log(error);
      alert("Failed to create campaign");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Campaigns
          </h1>

          <p className="text-gray-400 mt-2">
            Plan, schedule and send bulk WhatsApp campaigns
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 text-black px-5 py-3 rounded-lg font-bold"
        >
          New Campaign
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-900 p-6 rounded-xl mb-8">

          <h2 className="text-2xl font-bold mb-4">
            Create New Campaign
          </h2>

          <input
            type="text"
            placeholder="Campaign Name"
            value={campaignName}
            onChange={(e) =>
              setCampaignName(e.target.value)
            }
            className="w-full p-3 mb-4 rounded bg-slate-800"
          />

          <input
            type="text"
            placeholder="Audience Size"
            value={audience}
            onChange={(e) =>
              setAudience(e.target.value)
            }
            className="w-full p-3 mb-4 rounded bg-slate-800"
          />

          <textarea
            placeholder="Campaign Message"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            rows={4}
            className="w-full p-3 mb-4 rounded bg-slate-800"
          />

          <div className="flex gap-4">

            <button
              onClick={handleSaveCampaign}
              className="bg-green-500 text-black px-5 py-3 rounded-lg font-bold"
            >
              Save Campaign
            </button>

            <button
              onClick={() => setShowForm(false)}
              className="bg-red-500 px-5 py-3 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      <div className="flex gap-3 flex-wrap mb-8">

        {[
          "All",
          "Draft",
          "Scheduled",
          "Running",
          "Completed",
          "Failed",
          "Paused",
        ].map((tab) => (

          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${
              activeTab === tab
                ? "bg-green-500 text-black"
                : "bg-slate-800"
            }`}
          >
            {tab}
          </button>

        ))}

      </div>

      <div className="bg-slate-900 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">
            <tr>
              <th className="text-left p-4">Campaign</th>
              <th className="text-left p-4">Audience</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((campaign: any, index: number) => (

              <tr
                key={campaign._id || index}
                className="border-t border-slate-800"
              >

                <td className="p-4">
                  {campaign.name || campaign.title}
                </td>

                <td className="p-4">
                  {campaign.audience || "N/A"}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${badgeColor(
                      campaign.status || "Draft"
                    )}`}
                  >
                    {campaign.status || "Draft"}
                  </span>

                </td>

                <td className="p-4">

                  <button className="bg-blue-500 px-3 py-1 rounded mr-2">
                    View
                  </button>

                  <button className="bg-yellow-500 text-black px-3 py-1 rounded mr-2">
                    Edit
                  </button>

                  <button className="bg-red-500 px-3 py-1 rounded">
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}