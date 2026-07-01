import { useEffect, useState } from "react";
import { getProfile } from "../api/userApi";

export default function Profile() {
  const token = localStorage.getItem("token");

  const [avatar, setAvatar] = useState(
    "https://via.placeholder.com/120"
  );

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      if (!token) return;

      const data = await getProfile(token);

      setProfile({
        name: data.name || "",
        email: data.email || "",
        role: data.role || "User",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to load profile");
    }
  };

  const updateProfile = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/users/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: profile.name,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Profile Updated Successfully");
        setProfile({
          name: data.name,
          email: data.email,
          role: data.role || "User",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update profile");
    }
  };

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

      <div className="flex flex-col items-center mb-8">

        <img
          src={avatar}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mb-4"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

      </div>

      <div className="bg-slate-900 p-6 rounded-xl max-w-2xl">

        <div className="mb-6">

          <label className="block mb-2">
            Full Name
          </label>

          <input
            type="text"
            value={profile.name}
            onChange={(e) =>
              setProfile({
                ...profile,
                name: e.target.value,
              })
            }
            className="w-full p-3 rounded bg-slate-800"
          />

        </div>

        <div className="mb-6">

          <label className="block mb-2">
            Email
          </label>

          <input
            type="email"
            value={profile.email}
            readOnly
            className="w-full p-3 rounded bg-slate-800"
          />

        </div>

        <div className="mb-6">

          <label className="block mb-2">
            Role
          </label>

          <input
            type="text"
            value={profile.role}
            readOnly
            className="w-full p-3 rounded bg-slate-800"
          />

        </div>

        <button
          onClick={updateProfile}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold"
        >
          Save Changes
        </button>

        <div className="mt-8 bg-slate-800 p-4 rounded-lg">

          <h2 className="text-xl font-bold mb-2">
            Subscription
          </h2>

          <p>Plan: Premium</p>
          <p>Status: Active</p>
          <p>Renewal Date: 31 Dec 2026</p>

        </div>

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