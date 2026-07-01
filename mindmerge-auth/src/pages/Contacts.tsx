import { useEffect, useState } from "react";

interface Contact {
  _id?: string;
  name: string;
  email: string;
  phone: string;
}

export default function Contacts() {
  const token = localStorage.getItem("token") || "";

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [viewContact, setViewContact] = useState<Contact | null>(null);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [csvFile, setCsvFile] = useState<File | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/contacts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setContacts(data);
      } else {
        setContacts([]);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setEditingId(null);
  };

  const saveContact = async () => {
    if (!name.trim() || !phone.trim()) {
      alert("Name and Phone are required");
      return;
    }

    try {
      if (editingId) {
        await fetch(
          `http://localhost:5000/api/contacts/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name,
              email,
              phone,
            }),
          }
        );

        alert("Contact Updated");
      } else {
        await fetch(
          "http://localhost:5000/api/contacts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name,
              email,
              phone,
            }),
          }
        );

        alert("Contact Added");
      }

      clearForm();

      setShowForm(false);

      loadContacts();
    } catch (error) {
      console.log(error);
    }
  };

  const editContact = (contact: Contact) => {
    setEditingId(contact._id || "");

    setName(contact.name);

    setEmail(contact.email);

    setPhone(contact.phone);

    setShowForm(true);
  };
    const deleteContact = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(
        `http://localhost:5000/api/contacts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadContacts();

      alert("Contact Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const exportCSV = () => {
    const rows = [
      ["Name", "Email", "Phone"],
      ...contacts.map((c) => [
        c.name,
        c.email,
        c.phone,
      ]),
    ];

    const csvContent = rows
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "contacts.csv";

    link.click();

    window.URL.revokeObjectURL(url);
  };

  const importCSV = async () => {
    if (!csvFile) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      const res = await fetch(
        "http://localhost:5000/api/contacts/import",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await res.json();

    alert(data.message || "Contacts imported successfully!");

    setCsvFile(null);

    loadContacts();
  } catch (error) {
    console.error(error);
    alert("Failed to import contacts");
  }
};

  const filteredContacts = contacts.filter((contact) =>
    contact.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading Contacts...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Contacts
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your contact list
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={exportCSV}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg"
          >
            Export CSV
          </button>

          <input
            type="file"
            accept=".csv"
            id="csvFile"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setCsvFile(e.target.files[0]);
              }
            }}
          />

          <label
            htmlFor="csvFile"
            className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-lg cursor-pointer"
          >
            Choose CSV
          </label>

          <button
            onClick={importCSV}
            className="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-lg font-bold"
          >
            Import CSV
          </button>

          <button
            onClick={() => {
              clearForm();
              setShowForm(true);
            }}
            className="bg-green-500 hover:bg-green-600 text-black px-5 py-3 rounded-lg font-bold"
          >
            + Add Contact
          </button>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-gray-400">
            Total Contacts
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {contacts.length}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-gray-400">
            With Email
          </p>

          <h2 className="text-3xl font-bold text-green-400 mt-2">
            {
              contacts.filter(
                (c) => c.email
              ).length
            }
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-gray-400">
            Phone Numbers
          </p>

          <h2 className="text-3xl font-bold text-blue-400 mt-2">
            {
              contacts.filter(
                (c) => c.phone
              ).length
            }
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-gray-400">
            Search Results
          </p>

          <h2 className="text-3xl font-bold text-yellow-400 mt-2">
            {filteredContacts.length}
          </h2>
        </div>

      </div>
            {showForm && (
        <div className="bg-slate-900 p-6 rounded-xl mb-8">

          <h2 className="text-2xl font-bold mb-6">
            {editingId ? "Edit Contact" : "Add Contact"}
          </h2>

          <div className="grid gap-4">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700"
            />

            <div className="flex gap-4">

              <button
                onClick={saveContact}
                className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-bold"
              >
                {editingId ? "Update Contact" : "Save Contact"}
              </button>

              <button
                onClick={() => {
                  clearForm();
                  setShowForm(false);
                }}
                className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

      <input
        type="text"
        placeholder="Search Contacts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 p-3 rounded-lg bg-slate-800 border border-slate-700 mb-8"
      />

      <div className="bg-slate-900 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="text-left p-4">Name</th>

              <th className="text-left p-4">Email</th>

              <th className="text-left p-4">Phone</th>

              <th className="text-left p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredContacts.length > 0 ? (

              filteredContacts.map((contact) => (

                <tr
                  key={contact._id}
                  className="border-t border-slate-800"
                >

                  <td className="p-4">{contact.name}</td>

                  <td className="p-4">{contact.email || "-"}</td>

                  <td className="p-4">{contact.phone}</td>

                  <td className="p-4">

                    <button
                      onClick={() => setViewContact(contact)}
                      className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded mr-2"
                    >
                      View
                    </button>

                    <button
                      onClick={() => editContact(contact)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteContact(contact._id!)}
                      className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={4}
                  className="text-center text-gray-400 p-8"
                >
                  No Contacts Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>
            {viewContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">

          <div className="bg-slate-900 p-6 rounded-xl w-[450px]">

            <h2 className="text-2xl font-bold mb-6">
              Contact Details
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-gray-400">Name</p>
                <p className="font-semibold">
                  {viewContact.name}
                </p>
              </div>

              <div>
                <p className="text-gray-400">Email</p>
                <p className="font-semibold">
                  {viewContact.email || "-"}
                </p>
              </div>

              <div>
                <p className="text-gray-400">Phone</p>
                <p className="font-semibold">
                  {viewContact.phone}
                </p>
              </div>

            </div>

            <div className="flex justify-end mt-8">

              <button
                onClick={() => setViewContact(null)}
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