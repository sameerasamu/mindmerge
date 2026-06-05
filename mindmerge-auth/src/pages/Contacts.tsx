import { useState } from "react";

export default function Contacts() {
  const [search, setSearch] = useState("");

  const contacts = [
    { id: 1, name: "Rahul Kumar", phone: "+91 9876543210" },
    { id: 2, name: "Priya Sharma", phone: "+91 9123456789" },
    { id: 3, name: "Amit Singh", phone: "+91 9988776655" },
    { id: 4, name: "Sneha Patel", phone: "+91 9001122334" },
    { id: 5, name: "Arjun Reddy", phone: "+91 9556677889" },
    { id: 6, name: "Pooja Verma", phone: "+91 9445566778" },
    { id: 7, name: "Kiran Kumar", phone: "+91 9332211445" },
    { id: 8, name: "Neha Gupta", phone: "+91 9776655443" },
    { id: 9, name: "Vikram Rao", phone: "+91 9887766554" },
    { id: 10, name: "Anjali Devi", phone: "+91 9665544332" },
  ];

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-2">
        Contacts
      </h1>

      <p className="text-gray-400 mb-6">
        {contacts.length} total contacts
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <button className="bg-slate-700 px-4 py-2 rounded">
          Import CSV
        </button>

        <button className="bg-slate-700 px-4 py-2 rounded">
          Export
        </button>

        <button className="bg-green-500 text-black px-4 py-2 rounded font-bold">
          Add Contact
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search contacts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 p-3 rounded bg-slate-800 border border-slate-700 mb-6"
      />

      {/* Table */}
      <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Phone</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredContacts.map((contact) => (
              <tr
                key={contact.id}
                className="border-b border-slate-800"
              >
                <td className="p-3">{contact.name}</td>
                <td className="p-3">{contact.phone}</td>

                <td className="p-3">
                  <button className="bg-blue-500 px-3 py-1 rounded mr-2">
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