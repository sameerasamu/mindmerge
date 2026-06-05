import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = () => {
    alert("Account Created Successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-white mb-6">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-lg"
        >
          Create Account
        </button>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?
          <span
            onClick={() => navigate("/")}
            className="text-green-400 ml-2 cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}