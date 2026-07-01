import { useEffect, useState } from "react";

interface Campaign {
  _id?: string;
  name: string;
  audience: number;
  message: string;
  status: string;
  scheduleDate?: string;
  scheduleTime?: string;
  createdAt?: string;
}

interface Template {
  _id: string;
  title: string;
  content: string;
}

export default function Campaigns() {
  const token = localStorage.getItem("token") || "";

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [audience, setAudience] = useState("");
  const [message, setMessage] = useState("");

  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const [status, setStatus] = useState("Draft");

  const [selectedCampaign, setSelectedCampaign] =
    useState<Campaign | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);

  const loadCampaigns = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/campaigns",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setCampaigns(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const loadTemplates = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/templates",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userTemplates = await res.json();

      const readyTemplates: Template[] = [
        {
          _id: "ready1",
          title: "Birthday Wish",
          content:
            "🎉 Happy Birthday!\nStay blessed with happiness, health and success. Have a wonderful year ahead.",
        },
        {
          _id: "ready2",
          title: "Eid Mubarak",
          content:
            "🌙 Eid Mubarak!\nMay Allah accept your prayers and bless your family with peace and happiness.",
        },
        {
          _id: "ready3",
          title: "Welcome Message",
          content:
            "Welcome to MindMerge!\nThank you for joining us.",
        },
        {
          _id: "ready4",
          title: "Order Confirmation",
          content:
            "Your order has been confirmed successfully.",
        },
        {
          _id: "ready5",
          title: "Festival Offer",
          content:
            "🎁 Enjoy 20% OFF on all products. Limited period offer.",
        },
        {
          _id: "ready6",
          title: "Appointment Reminder",
          content:
            "Reminder: Your appointment is scheduled for tomorrow.",
        },
      ];

      setTemplates([
        ...readyTemplates,
        ...(Array.isArray(userTemplates) ? userTemplates : []),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCampaigns();
    loadTemplates();
  }, []);
  const addCampaign = async () => {
  if (!name || !audience || !message) {
    alert("Please fill all required fields");
    return;
  }

  try {
    await fetch(
      editingId
        ? `http://localhost:5000/api/campaigns/${editingId}`
        : "http://localhost:5000/api/campaigns",
      {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          audience: Number(audience),
          message,
          scheduleDate,
          scheduleTime,
          status,
        }),
      }
    );

    setName("");
    setAudience("");
    setMessage("");
    setSelectedTemplate("");
    setScheduleDate("");
    setScheduleTime("");
    setStatus("Draft");
    setEditingId(null);

    setShowForm(false);

    loadCampaigns();
  } catch (err) {
    console.log(err);
  }
};

const deleteCampaign = async (id: string) => {
  if (!window.confirm("Delete campaign?")) return;

  try {
    await fetch(
      `http://localhost:5000/api/campaigns/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadCampaigns();
  } catch (err) {
    console.log(err);
  }
};
const exportCSV = () => {
  const rows = [
    [
      "Campaign",
      "Audience",
      "Status",
      "Schedule Date",
      "Schedule Time",
    ],
    ...campaigns.map((c) => [
      c.name,
      c.audience,
      c.status,
      c.scheduleDate || "",
      c.scheduleTime || "",
    ]),
  ];

  const csv = rows.map((r) => r.join(",")).join("\n");

  const blob = new Blob([csv], {
    type: "text/csv",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "campaigns.csv";
  a.click();

  URL.revokeObjectURL(url);
};

const filteredCampaigns = campaigns.filter((campaign) =>
  campaign.name.toLowerCase().includes(search.toLowerCase())
);

const totalCampaigns = campaigns.length;

const totalAudience = campaigns.reduce(
  (sum, c) => sum + Number(c.audience || 0),
  0
);

const scheduledCampaigns = campaigns.filter(
  (c) => c.status === "Scheduled"
).length;

const draftCampaigns = campaigns.filter(
  (c) => (c.status || "Draft") === "Draft"
).length;

if (loading) {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      Loading...
    </div>
  );
}
return (
  <div className="min-h-screen bg-slate-950 text-white p-8">

    <div className="flex justify-between items-center mb-8">

      <div>
        <h1 className="text-4xl font-bold">Campaigns</h1>

        <p className="text-gray-400 mt-2">
          Create, manage and monitor WhatsApp campaigns
        </p>
      </div>

      <div className="flex gap-3">

        <button
          onClick={exportCSV}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg"
        >
          Export CSV
        </button>

        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 hover:bg-green-600 text-black px-5 py-3 rounded-lg font-bold"
        >
          + New Campaign
        </button>

      </div>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

      <div className="bg-slate-900 rounded-xl p-6">
        <p className="text-gray-400">Total Campaigns</p>
        <h2 className="text-4xl font-bold text-green-400 mt-2">
          {totalCampaigns}
        </h2>
      </div>

      <div className="bg-slate-900 rounded-xl p-6">
        <p className="text-gray-400">Total Audience</p>
        <h2 className="text-4xl font-bold text-blue-400 mt-2">
          {totalAudience}
        </h2>
      </div>

      <div className="bg-slate-900 rounded-xl p-6">
        <p className="text-gray-400">Scheduled</p>
        <h2 className="text-4xl font-bold text-yellow-400 mt-2">
          {scheduledCampaigns}
        </h2>
      </div>

      <div className="bg-slate-900 rounded-xl p-6">
        <p className="text-gray-400">Draft</p>
        <h2 className="text-4xl font-bold text-purple-400 mt-2">
          {draftCampaigns}
        </h2>
      </div>

    </div>
    {showForm && (

  <div className="bg-slate-900 rounded-xl p-6 mb-8">

    <h2 className="text-2xl font-bold mb-6">
      {editingId ? "Edit Campaign" : "Create Campaign"}
    </h2>

    <div className="grid gap-4">

      <input
        type="text"
        placeholder="Campaign Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-3 rounded-lg bg-slate-800 border border-slate-700"
      />

      <input
        type="number"
        placeholder="Audience Size"
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
        className="p-3 rounded-lg bg-slate-800 border border-slate-700"
      />

      <select
        value={selectedTemplate}
        onChange={(e) => {
          const id = e.target.value;
          setSelectedTemplate(id);

          const template = templates.find(
            (t) => t._id === id
          );

          if (template) {
            setMessage(template.content);
          } else {
            setMessage("");
          }
        }}
        className="p-3 rounded-lg bg-slate-800 border border-slate-700"
      >
        <option value="">
          Select Template (Optional)
        </option>

        {templates.map((template) => (
          <option
            key={template._id}
            value={template._id}
          >
            {template.title}
          </option>
        ))}
      </select>

      <textarea
        rows={5}
        placeholder="Campaign Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="p-3 rounded-lg bg-slate-800 border border-slate-700"
      />

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="date"
          value={scheduleDate}
          onChange={(e) =>
            setScheduleDate(e.target.value)
          }
          className="p-3 rounded-lg bg-slate-800 border border-slate-700"
        />

        <input
          type="time"
          value={scheduleTime}
          onChange={(e) =>
            setScheduleTime(e.target.value)
          }
          className="p-3 rounded-lg bg-slate-800 border border-slate-700"
        />

      </div>

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="p-3 rounded-lg bg-slate-800 border border-slate-700"
      >
        <option>Draft</option>
        <option>Scheduled</option>
        <option>Running</option>
        <option>Completed</option>
      </select>

      <div className="flex gap-4">

        <button
          onClick={addCampaign}
          className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-bold"
        >
          {editingId ? "Update Campaign" : "Save Campaign"}
        </button>

        <button
          onClick={() => setShowForm(false)}
          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg"
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}
<div className="flex flex-col md:flex-row gap-4 mb-6">

  <input
    type="text"
    placeholder="Search Campaign..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="flex-1 p-3 rounded-lg bg-slate-900 border border-slate-700"
  />

</div>

<div className="bg-slate-900 rounded-xl overflow-hidden">

  <table className="w-full">

    <thead className="bg-slate-800">

      <tr>

        <th className="text-left p-4">Campaign</th>

        <th className="text-left p-4">Audience</th>

        <th className="text-left p-4">Status</th>

        <th className="text-left p-4">Schedule</th>

        <th className="text-left p-4">Actions</th>

      </tr>

    </thead>

    <tbody>

      {filteredCampaigns.length > 0 ? (

        filteredCampaigns.map((campaign) => (

          <tr
            key={campaign._id}
            className="border-t border-slate-800"
          >

            <td className="p-4">

              <div>

                <p className="font-semibold">
                  {campaign.name}
                </p>

                <p className="text-sm text-gray-400">
                  {campaign.message.length > 40
                    ? campaign.message.substring(0, 40) + "..."
                    : campaign.message}
                </p>

              </div>

            </td>

            <td className="p-4">
              {campaign.audience}
            </td>

            <td className="p-4">

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  campaign.status === "Completed"
                    ? "bg-green-600"
                    : campaign.status === "Scheduled"
                    ? "bg-yellow-500 text-black"
                    : campaign.status === "Running"
                    ? "bg-blue-600"
                    : "bg-gray-600"
                }`}
              >
                {campaign.status}
              </span>

            </td>

            <td className="p-4">

              <div className="text-sm">

                <p>{campaign.scheduleDate || "-"}</p>

                <p className="text-gray-400">
                  {campaign.scheduleTime || "-"}
                </p>

              </div>

            </td>

            <td className="p-4">

              <div className="flex gap-2">

                <button
                  onClick={() => {
                    setEditingId(campaign._id!);

                    setName(campaign.name);
                    setAudience(String(campaign.audience));
                    setMessage(campaign.message);
                    setScheduleDate(campaign.scheduleDate || "");
                    setScheduleTime(campaign.scheduleTime || "");
                    setStatus(campaign.status);

                    setShowForm(true);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => setSelectedCampaign(campaign)}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                >
                  View
                </button>

                <button
                  onClick={() => deleteCampaign(campaign._id!)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                >
                  Delete
                </button>

              </div>

            </td>

          </tr>

        ))

      ) : (

        <tr>

          <td
            colSpan={5}
            className="text-center text-gray-400 p-8"
          >
            No campaigns found.
          </td>

        </tr>

      )}

    </tbody>

  </table>

</div>
{selectedCampaign && (

  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">

    <div className="bg-slate-900 rounded-xl p-6 w-[500px]">

      <h2 className="text-2xl font-bold mb-6">
        Campaign Details
      </h2>

      <div className="space-y-4">

        <div>
          <p className="text-gray-400">Campaign Name</p>
          <p className="font-semibold">
            {selectedCampaign.name}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Audience</p>
          <p className="font-semibold">
            {selectedCampaign.audience}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Message</p>
          <p className="font-semibold whitespace-pre-wrap">
            {selectedCampaign.message}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Status</p>

          <span
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCampaign.status === "Completed"
                ? "bg-green-600"
                : selectedCampaign.status === "Scheduled"
                ? "bg-yellow-500 text-black"
                : selectedCampaign.status === "Running"
                ? "bg-blue-600"
                : "bg-gray-600"
            }`}
          >
            {selectedCampaign.status}
          </span>
        </div>

        <div>
          <p className="text-gray-400">Schedule Date</p>
          <p className="font-semibold">
            {selectedCampaign.scheduleDate || "-"}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Schedule Time</p>
          <p className="font-semibold">
            {selectedCampaign.scheduleTime || "-"}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Created At</p>
          <p className="font-semibold">
            {selectedCampaign.createdAt
              ? new Date(
                  selectedCampaign.createdAt
                ).toLocaleString()
              : "-"}
          </p>
        </div>

      </div>

      <div className="flex justify-end mt-8">

        <button
          onClick={() => setSelectedCampaign(null)}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
        >
          Close
        </button>

      </div>

    </div>

  </div>

)}

</div>
);
}