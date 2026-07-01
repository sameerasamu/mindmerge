import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(
        email,
        password
      );

      if (data.token) {
        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        if (data.user) {
          localStorage.setItem(
            "role",
            data.user.role || "User"
          );

          localStorage.setItem(
            "name",
            data.user.name || ""
          );

          localStorage.setItem(
            "email",
            data.user.email || ""
          );
        }

        navigate("/dashboard");
      } else {
        alert(
          data.message ||
            "Invalid Credentials"
        );
      }
    } catch (error) {
      console.log(error);

      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20">

        <div className="inline-flex items-center gap-3 mb-10">

          <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center text-2xl">
            💬
          </div>

          <div>

            <h1 className="text-4xl font-bold text-white">
              MindMerge
            </h1>

            <p className="text-gray-400">
              WhatsApp Marketing Platform
            </p>

          </div>

        </div>

        <h2 className="text-6xl font-extrabold leading-tight text-white">

          Grow your business

          <span className="text-green-400">
            {" "}
            with WhatsApp
          </span>

        </h2>

        <p className="text-gray-300 text-xl mt-8 leading-9">

          Create campaigns, schedule messages,
          manage contacts, monitor reports,
          and automate conversations from one
          powerful dashboard.

        </p>

        <div className="grid grid-cols-2 gap-6 mt-16">

          <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6">

            <h3 className="text-3xl font-bold text-green-400">
              10K+
            </h3>

            <p className="text-gray-300 mt-2">
              Messages Delivered
            </p>

          </div>

          <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6">

            <h3 className="text-3xl font-bold text-blue-400">
              99%
            </h3>

            <p className="text-gray-300 mt-2">
              Delivery Rate
            </p>

          </div>

        </div>

      </div>
            {/* RIGHT PANEL */}

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">

        <div className="w-full max-w-md bg-slate-900/70 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-10">

          <h2 className="text-4xl font-bold text-white mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-gray-400 mb-10">
            Sign in to continue to your MindMerge dashboard.
          </p>

          {/* Email */}

          <div className="mb-6">

            <label className="text-gray-300 mb-2 block">
              Email Address
            </label>

            <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 px-4">

              <Mail className="text-gray-400" size={20} />

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full bg-transparent outline-none text-white px-3 py-4"
              />

            </div>

          </div>

          {/* Password */}

          <div className="mb-4">

            <label className="text-gray-300 mb-2 block">
              Password
            </label>

            <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 px-4">

              <Lock className="text-gray-400" size={20} />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-transparent outline-none text-white px-3 py-4"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          <div className="flex justify-between items-center mb-8">

            <label className="flex items-center gap-2 text-gray-300">

              <input
                type="checkbox"
                className="accent-green-500"
              />

              Remember Me

            </label>

            <button
              onClick={() =>
                navigate("/forgot-password")
              }
              className="text-green-400 hover:text-green-300 font-medium"
            >
              Forgot Password?
            </button>

          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 transition py-4 rounded-xl text-lg font-bold text-black disabled:opacity-50"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

          <div className="mt-8 text-center text-gray-400">

            Don't have an account?

            <button
              onClick={() =>
                navigate("/signup")
              }
              className="ml-2 text-green-400 hover:text-green-300 font-semibold"
            >
              Create Account
            </button>

          </div>
                  </div>

      </div>

    </div>
  );
}