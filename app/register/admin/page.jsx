"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminRegister() {
  const router = useRouter();
  const [step, setStep] = useState("registration");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ================= VALIDATIONS ================= */
  const validateEmail = (email) =>
    /^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,}$/.test(email) && !/[A-Z]/.test(email);

  const validateName = (name) => /^[A-Za-z\s]{3,}$/.test(name);

  const validatePassword = (password) =>
    /^[A-Z](?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,}$/.test(password);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= REGISTER ================= */
  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(form.email)) return setErrors({ email: "Invalid email address" });
    if (!validateName(form.name)) return setErrors({ name: "Invalid name" });
    if (!validatePassword(form.password)) return setErrors({ password: "Weak password" });
    if (form.password !== form.confirmPassword) return setErrors({ confirmPassword: "Passwords do not match" });

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${API_URL}/api/admin/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        setErrors({ general: data.message || "Registration failed" });
        return;
      }

      setStep("otp");
    } catch (error) {
      console.error(error);
      setErrors({ general: "Server error" });
    } finally {
      setLoading(false);
    }
  };

  /* ================= OTP VERIFY ================= */
  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    if (form.otp.length !== 6) return setErrors({ otp: "Invalid OTP" });

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${API_URL}/api/admin/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, otp: form.otp }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        setErrors({ otp: data.message || "OTP failed" });
        return;
      }

      router.push(`/account-status?email=${encodeURIComponent(form.email)}&type=admin`);
    } catch (error) {
      console.error(error);
      setErrors({ general: "Server error" });
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  const inputClass = (field) =>
    `w-full border rounded-lg p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-500 focus:ring-red-400"
        : form[field]
        ? "border-green-500 focus:ring-green-400"
        : "border-gray-300 focus:ring-[#00b8ff]"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-20 bg-gradient-to-br from-[#000a1f] via-[#001f3f] to-[#003d66]">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-md"
      >
        {step === "registration" ? (
          <>
            <h2 className="text-3xl font-bold text-[#00b8ff] text-center mb-4">
              Admin Registration
            </h2>

            {errors.general && <p className="text-red-600 text-center mb-4">{errors.general}</p>}

            <form onSubmit={handleRegistrationSubmit} className="space-y-4">
              <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className={inputClass("name")} required />
              <input name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className={inputClass("email")} required />
              <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className={inputClass("password")} required />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} className={inputClass("confirmPassword")} required />

              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#004080] to-[#00b8ff] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-300 disabled:opacity-50">
                {loading ? "Sending OTP..." : "Register"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-[#00b8ff] text-center mb-4">Verify OTP</h2>

            <form onSubmit={handleOTPSubmit} className="space-y-4">
              <input name="otp" placeholder="6-digit OTP" value={form.otp} onChange={handleChange} maxLength="6" className={inputClass("otp")} required />
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#004080] to-[#00b8ff] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-300 disabled:opacity-50">
                {loading ? "Verifying..." : "Verify"}
              </button>
            </form>

            <button onClick={() => setStep("registration")} className="w-full mt-4 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition duration-300">
              Back
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
