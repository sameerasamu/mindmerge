import { FaGoogle, FaGithub, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  // User Role
  const role = "Admin";

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-teal-500 via-sky-500 to-purple-500 p-12 text-white flex-col justify-center">
        <div className="flex items-center gap-3 mb-16">
          <FaWhatsapp size={40} />

          <div>
            <h2 className="text-3xl font-bold">MindMerge</h2>
            <p>WAFLOW</p>
          </div>
        </div>

        <h1 className="text-6xl font-bold leading-tight max-w-xl">
          Send beautiful WhatsApp campaigns at scale.
        </h1>

        <p className="mt-6 text-xl max-w-xl">
          Reach millions of customers with rich templates,
          scheduling and real-time analytics — all in one workspace.
        </p>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 bg-slate-950 text-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-5xl font-bold mb-3">
            Welcome back
          </h1>

          <p className="text-gray-400 mb-8">
            Sign in to your MindMerge WAFlow account
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="border border-gray-700 rounded-lg py-3 flex items-center justify-center gap-2">
              <FaGoogle />
              Google
            </button>

            <button className="border border-gray-700 rounded-lg py-3 flex items-center justify-center gap-2">
              <FaGithub />
              GitHub
            </button>
          </div>

          <input
            type="email"
            placeholder="you@company.com"
            className="w-full mb-4 p-3 rounded-lg bg-slate-900 border border-slate-700"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-3 rounded-lg bg-slate-900 border border-slate-700"
          />

          <div className="flex justify-between mb-6 text-sm">
            <label>
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>

            <span
              onClick={() => navigate("/forgot-password")}
              className="cursor-pointer text-green-400"
            >
              Forgot Password?
            </span>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-lg"
          >
            Sign In
          </button>

          <p className="text-center mt-6">
            Don't have an account?
            <span
              onClick={() => navigate("/signup")}
              className="text-green-400 ml-2 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;