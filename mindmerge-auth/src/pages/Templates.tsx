import { useEffect, useState } from "react";

interface Template {
  _id?: string;
  title: string;
  content: string;
  category?: string;
  createdAt?: string;
}

export default function Templates() {
  const token = localStorage.getItem("token");

  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [selectedTemplate, setSelectedTemplate] =
    useState<Template | null>(null);

  const [editingTemplate, setEditingTemplate] =
    useState<Template | null>(null);

  const [name, setName] = useState("");

  const [message, setMessage] = useState("");

  const [category, setCategory] = useState("Marketing");

  const readyTemplates = [
    {
      title: "Birthday Wish",
      category: "Marketing",
      message:
        "🎉 Happy Birthday!\nStay blessed with happiness, health and success. Have a wonderful year ahead.",
    },
    {
      title: "Eid Mubarak",
      category: "Marketing",
      message:
        "🌙 Eid Mubarak!\nMay Allah accept your prayers and bless you and your family with peace and happiness.",
    },
    {
      title: "Welcome Message",
      category: "Utility",
      message:
        "Welcome to MindMerge!\nThank you for joining us. We're happy to have you with us.",
    },
    {
      title: "Order Confirmation",
      category: "Utility",
      message:
        "Your order has been confirmed successfully.\nThank you for shopping with us.",
    },
    {
      title: "Appointment Reminder",
      category: "Utility",
      message:
        "This is a reminder for your appointment tomorrow.\nPlease arrive 10 minutes early.",
    },
    {
      title: "Payment Reminder",
      category: "Utility",
      message:
        "Friendly Reminder:\nYour payment is due today. Kindly complete it to avoid interruption.",
    },
  ];

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

      const data = await res.json();

      const list = Array.isArray(data) ? data : [];

      setTemplates(list);
      setFilteredTemplates(list);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  useEffect(() => {
  setFilteredTemplates(
    templates.filter((template) =>
      template.title
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );
}, [search, templates]);
    const saveTemplate = async () => {
    if (!name.trim() || !message.trim()) {
      alert("Template Name and Message are required.");
      return;
    }

    try {
      const url = editingTemplate
        ? `http://localhost:5000/api/templates/${editingTemplate._id}`
        : "http://localhost:5000/api/templates";

      const method = editingTemplate ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: name,
          content: message,
          category,
  
        }),
      });

      setShowForm(false);
      setEditingTemplate(null);

      setName("");
      setMessage("");
      setCategory("Marketing");

      loadTemplates();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTemplate = async (id: string) => {
    if (!window.confirm("Delete this template?")) return;

    try {
      await fetch(
        `http://localhost:5000/api/templates/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadTemplates();
    } catch (err) {
      console.log(err);
    }
  };

  const exportCSV = () => {
    const rows = [
      ["Title", "Message"],
      ...filteredTemplates.map((template) => [
        template.title,
        template.content,
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "templates.csv";

    a.click();

    URL.revokeObjectURL(url);
  };

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
          <h1 className="text-5xl font-bold">Templates</h1>

          <p className="text-gray-400 mt-2">
            Create and manage WhatsApp message templates
          </p>
        </div>

        <div className="flex gap-4">

          <button
            onClick={exportCSV}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
          >
            Export CSV
          </button>

          <button
            onClick={() => {
              setEditingTemplate(null);
              setName("");
              setMessage("");
              setCategory("Marketing");
              setShowForm(true);
            }}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold"
          >
            + New Template
          </button>

        </div>

      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-800 rounded-xl p-6">
          <p className="text-gray-400">Total Templates</p>
          <h2 className="text-5xl font-bold text-green-400 mt-2">
            {templates.length}
          </h2>
        </div>

        <div className="bg-slate-800 rounded-xl p-6">
          <p className="text-gray-400">Marketing</p>
          <h2 className="text-5xl font-bold text-blue-400 mt-2">
            {templates.length}
          </h2>
        </div>

        <div className="bg-slate-800 rounded-xl p-6">
          <p className="text-gray-400">Utility</p>
          <h2 className="text-5xl font-bold text-yellow-400 mt-2">
            0
          </h2>
        </div>

        <div className="bg-slate-800 rounded-xl p-6">
          <p className="text-gray-400">Search Results</p>
          <h2 className="text-5xl font-bold text-pink-400 mt-2">
            {filteredTemplates.length}
          </h2>
        </div>

      </div>

      <input
        type="text"
        placeholder="Search Templates..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 p-4 rounded-xl bg-slate-800 border border-slate-700 mb-8"
      />

      {/* Ready-to-Use Templates */}

      <div className="mb-10">

        <h2 className="text-2xl font-bold mb-5">
          Ready-to-Use Templates
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {readyTemplates.map((template, index) => (

          <div
            key={index}
            className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-green-500 transition"
          >

            <h3 className="text-xl font-bold text-green-400">
              {template.title}
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              {template.category}
            </p>

            <p className="text-gray-300 mt-4 whitespace-pre-line">
              {template.message}
            </p>

            <button
              className="mt-5 w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold"
              onClick={() => {
                setEditingTemplate(null);
                setName(template.title);
                setMessage(template.message);
                setCategory(template.category);
                setShowForm(true);
              }}
            >
              Use Template
            </button>

          </div>

        ))}

      </div>

    </div>

      {showForm && (

        <div className="bg-slate-900 rounded-xl p-6 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            {editingTemplate ? "Edit Template" : "New Template"}
          </h2>

          <div className="grid gap-4">

            <input
              placeholder="Template Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 rounded bg-slate-800 border border-slate-700"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 rounded bg-slate-800 border border-slate-700"
            >
              <option>Marketing</option>
              <option>Utility</option>
              <option>Authentication</option>
            </select>

            <textarea
              rows={6}
              placeholder="Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-3 rounded bg-slate-800 border border-slate-700"
            />

            <div className="flex gap-4">

              <button
                onClick={saveTemplate}
                className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg"
              >
                Save Template
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}
            <div className="bg-slate-900 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="text-left p-4">Name</th>

              <th className="text-left p-4">Category</th>

              <th className="text-left p-4">Message</th>

              <th className="text-left p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredTemplates.length > 0 ? (

              filteredTemplates.map((template) => (

                <tr
                  key={template._id}
                  className="border-t border-slate-800"
                >

                  <td className="p-4 font-semibold">
                    {template.title}
                  </td>

                  <td className="p-4">
                    {template.category || "Marketing"}
                  </td>

                  <td className="p-4">
                    {(template.content || "").length > 50
                      ? (template.content || "").substring(0, 50) + "..."
                      : (template.content || "")}
                  </td>
                  <td className="p-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          setSelectedTemplate(template)
                        }
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                      >
                        View
                      </button>

                      <button
                        onClick={() => {
                          setEditingTemplate(template);
                          setName(template.title);
                          setMessage(template.content);
                          setCategory("Marketing");
                          setShowForm(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteTemplate(template._id!)
                        }
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
                  colSpan={4}
                  className="text-center p-8 text-gray-400"
                >
                  No templates found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {selectedTemplate && (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">

          <div className="bg-slate-900 p-6 rounded-xl w-[500px]">

            <h2 className="text-2xl font-bold mb-6">
              Template Details
            </h2>

            <div className="space-y-4">

              <div>

                <p className="text-gray-400">
                  Name
                </p>

                <p className="font-semibold">
                  {selectedTemplate.title}
                </p>

              </div>

              <div>

                <p className="text-gray-400">
                  Category
                </p>

                <p className="font-semibold">
                  {selectedTemplate.category || "Marketing"}
                </p>

              </div>

              <div>

                <p className="text-gray-400">
                  Message
                </p>

                <p className="font-semibold whitespace-pre-wrap">
                  {selectedTemplate.content || "-"}
                </p>

              </div>

            </div>

            <div className="flex justify-end mt-8">

              <button
                onClick={() => setSelectedTemplate(null)}
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