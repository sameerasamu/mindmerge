import React from "react";

interface Template {
  id: number;
  title: string;
  category: string;
  language: string;
  updated: string;
  message: string;
}

const templates: Template[] = [
  {
    id: 1,
    title: "Welcome",
    category: "Marketing",
    language: "EN",
    updated: "2025-05-20",
    message:
      "Hi {Name}, welcome to MindMerge! Your journey begins today.",
  },
  {
    id: 2,
    title: "Course Reminder",
    category: "Utility",
    language: "EN",
    updated: "2025-05-18",
    message:
      "Hi {Name}, your {Course} starts on {Date}. See you soon!",
  },
  {
    id: 3,
    title: "Payment Received",
    category: "Transactional",
    language: "EN",
    updated: "2025-05-15",
    message:
      "Thanks {Name}! We received {Amount} for {Course}.",
  },
  {
    id: 4,
    title: "Re-engagement",
    category: "Marketing",
    language: "EN",
    updated: "2025-05-10",
    message:
      "Hey {Name}, we miss you. Come back for an exclusive offer!",
  },
];

export default function Templates() {
  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Templates
          </h1>

          <p className="text-gray-400">
            Reusable message templates with variables
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
          + New Template
        </button>
      </div>

      <div className="grid gap-5">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-gray-800 border border-gray-700 rounded-xl shadow-md p-5"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {template.title}
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  {template.category} · {template.language} · Updated{" "}
                  {template.updated}
                </p>

                <p className="mt-4 text-gray-300">
                  {template.message}
                </p>
              </div>

              <div className="flex gap-2">
                <button className="border border-gray-600 px-3 py-1 rounded-md hover:bg-gray-700 text-white">
                  Preview
                </button>

                <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}