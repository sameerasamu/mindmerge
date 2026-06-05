export default function ChangePassword() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          Change Password
        </h1>

        <input
          type="password"
          placeholder="Current Password"
          className="w-full p-3 mb-4 rounded bg-slate-800"
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 mb-4 rounded bg-slate-800"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full p-3 mb-6 rounded bg-slate-800"
        />

        <button className="w-full bg-green-500 text-black py-3 rounded font-bold">
          Update Password
        </button>

      </div>
    </div>
  );
}