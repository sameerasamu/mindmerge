import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleSendOTP = () => {
    navigate("/verify-otp");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-white mb-6">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white"
        />

        <button
          onClick={handleSendOTP}
          className="w-full bg-green-500 py-3 rounded-lg font-bold"
        >
          Send OTP
        </button>

      </div>
    </div>
  );
}