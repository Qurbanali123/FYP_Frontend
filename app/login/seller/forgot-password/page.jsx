"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SellerForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!email) {
      setErrors({ email: "Email is required" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/seller/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message || "Failed to send reset email" });
        return;
      }

      setSuccessMessage("OTP sent to your email");
      setStep("otp");
    } catch (err) {
      console.error("Error:", err);
      setErrors({ general: "Something went wrong. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!otp) {
      setErrors({ otp: "OTP is required" });
      return;
    }

    if (!newPassword) {
      setErrors({ newPassword: "New password is required" });
      return;
    }

    if (!confirmPassword) {
      setErrors({ confirmPassword: "Please confirm your password" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    if (newPassword.length < 6) {
      setErrors({ newPassword: "Password must be at least 6 characters" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/seller/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message || "Failed to reset password" });
        return;
      }

      setSuccessMessage("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login/seller");
      }, 2000);
    } catch (err) {
      console.error("Error:", err);
      setErrors({ general: "Something went wrong. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full border rounded-lg p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-500 focus:ring-red-400"
        : "border-gray-300 focus:ring-[#00b8ff]"
    }`;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #000a1f 0%, #001f3f 50%, #003d66 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-2 text-[#00b8ff] text-center">Reset Password</h1>
        <p className="text-gray-600 text-center text-sm mb-6">
          {step === "email" ? "Enter your email to receive a reset code" : "Verify OTP and set new password"}
        </p>

        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {errors.general}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            {successMessage}
          </div>
        )}

        {step === "email" ? (
          <form onSubmit={handleRequestReset} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: "" });
                }}
                required
                className={inputClass("email")}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-br from-[#004080] via-[#00b8ff] to-[#14b8a6] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-300 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setErrors({ ...errors, otp: "" });
                }}
                maxLength="6"
                required
                className={inputClass("otp")}
              />
              {errors.otp && <p className="text-red-600 text-sm mt-1">{errors.otp}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrors({ ...errors, newPassword: "" });
                }}
                required
                className={inputClass("newPassword")}
              />
              {errors.newPassword && <p className="text-red-600 text-sm mt-1">{errors.newPassword}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({ ...errors, confirmPassword: "" });
                }}
                required
                className={inputClass("confirmPassword")}
              />
              {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-br from-[#004080] via-[#00b8ff] to-[#14b8a6] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-300 disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep("email");
                setOtp("");
                setNewPassword("");
                setConfirmPassword("");
              }}
              className="w-full text-[#00b8ff] font-medium hover:underline text-center"
            >
              Back to Email
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-600 mt-4">
          Remember your password?{" "}
          <span
            onClick={() => router.push("/login/seller")}
            className="text-[#00b8ff] cursor-pointer hover:underline font-medium"
          >
            Login here
          </span>
        </p>
      </motion.div>
    </div>
  );
}
