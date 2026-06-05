import { useState } from "react";

export default function Profile() {
  const [avatar, setAvatar] = useState(
    "https://via.placeholder.com/120"
  );

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        My Profile
      </h1>

      {/* Avatar */}
      <div className="mb-8 flex flex-col items-center">
        <img
          src={avatar}
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4 object-cover"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="text-white"
        />
      </div>

      {/* Profile Details */}
      <div className="bg-slate-900 p-6 rounded-xl max-w-2xl">
        <div className="mb-6">
          <label className="block mb-2">Full Name</label>
          <input
            type="text"
            value="Sameera"
            className="w-full p-3 rounded bg-slate-800"
            readOnly
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value="sameera@example.com"
            className="w-full p-3 rounded bg-slate-800"
            readOnly
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2">Role</label>
          <input
            type="text"
            value={localStorage.getItem("role") || ""}
            className="w-full p-3 rounded bg-slate-800"
            readOnly
          />
        </div>

        <button className="bg-green-500 text-black px-6 py-3 rounded font-bold">
          Update Profile
        </button>

        {/* Subscription */}
        <div className="mt-8 bg-slate-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">
            Subscription
          </h2>

          <p>Plan: Premium</p>
          <p>Status: Active</p>
          <p>Renewal Date: 31 Dec 2026</p>
        </div>

        {/* Active Sessions */}
        <div className="mt-8 bg-slate-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">
            Active Sessions
          </h2>

          <p>Chrome - Windows</p>
          <p>Edge - Windows</p>
          <p>Mobile Device</p>
        </div>
      </div>
    </div>
  );
}