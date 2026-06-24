import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp, resendOtp } from "../../api/authApi";

export default function VerifyOTP() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    if (!email || !otp) {
      alert("Please enter email and OTP");
      return;
    }

    try {
      const data = await verifyOtp(email, otp);

      alert(data.message || "OTP Verified Successfully!");

      // Redirect to login page after verification
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Invalid OTP");
    }
  };

  const handleResend = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      const data = await resendOtp(email);

      alert(data.message || "OTP Sent Successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-white mb-6">
          Verify OTP
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
        />

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white"
        />

        <button
          onClick={handleVerify}
          className="w-full bg-green-500 py-3 rounded-lg font-bold mb-3"
        >
          Verify OTP
        </button>

        <button
          onClick={handleResend}
          className="w-full bg-slate-700 text-white py-3 rounded-lg font-bold"
        >
          Resend OTP
        </button>

      </div>
    </div>
  );
}