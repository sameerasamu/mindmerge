import { useState } from "react";
import { loginUser } from "../../api/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login Successful");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server Error");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#020817",
        color: "white",
      }}
    >
      {/* Left Side */}
      <div
        style={{
          flex: 1,
          background:
            "linear-gradient(135deg,#10b981,#3b82f6,#a855f7)",
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2>💬 MindMerge WAFlow</h2>

        <h1
          style={{
            fontSize: "50px",
            marginTop: "80px",
          }}
        >
          Send beautiful WhatsApp campaigns at scale.
        </h1>

        <p style={{ fontSize: "20px" }}>
          Reach millions of customers with templates,
          scheduling and analytics.
        </p>
      </div>

      {/* Right Side */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "450px",
          }}
        >
          <h1>Welcome Back</h1>

          <p>Sign in to your MindMerge account</p>

          <br />

          <button
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
            }}
          >
            Login with Google
          </button>

          <button
            style={{
              width: "100%",
              padding: "12px",
            }}
          >
            Login with GitHub
          </button>

          <br />
          <br />

          <input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
            }}
          />

          <label>
            <input type="checkbox" />
            Remember me
          </label>

          <br />
          <br />

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "#10b981",
              border: "none",
              color: "white",
              fontSize: "18px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>

          <p style={{ marginTop: "20px" }}>
            Don't have an account? Sign Up
          </p>
        </div>
      </div>
    </div>
  );
}