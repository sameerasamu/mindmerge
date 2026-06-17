import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOTP from "../pages/auth/VerifyOTP";
import ResetPassword from "../pages/auth/ResetPassword";
import { Routes, Route } from "react-router-dom";
import App from "../App";
import Dashboard from "../Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile";
import ChangePassword from "../pages/ChangePassword";

import Campaigns from "../pages/Campaigns";
import Contacts from "../pages/Contacts";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";

import Templates from "../pages/Templates";
import WhatsApp from "../pages/WhatsApp";
import Reports from "../pages/Reports";
export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth Pages */}
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Main Pages */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />

      {/* Sidebar Pages */}
      <Route
        path="/campaigns"
        element={
          <ProtectedRoute>
            <Campaigns />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contacts"
        element={
          <ProtectedRoute>
            <Contacts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/templates"
        element={
          <ProtectedRoute>
            <Templates />
          </ProtectedRoute>
        }
      />

      <Route
        path="/whatsapp"
        element={
          <ProtectedRoute>
            <WhatsApp />
          </ProtectedRoute>
        }
      />
      <Route
  path="/reports"
  element={
    <ProtectedRoute>
      <Reports />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
}