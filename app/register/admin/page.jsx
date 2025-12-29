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
    <div className="min-h-screen flex items-center justify-center p-6 pt-20 bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-md"
      >
        {step === "registration" ? (
          <>
            <h2 className="text-3xl font-bold text-center text-[#00b8ff] mb-3">Admin Registration</h2>
            {errors.general && <p className="text-red-500 text-center mb-3">{errors.general}</p>}

            <form onSubmit={handleRegistrationSubmit} className="space-y-4">
              <input name="name" placeholder="Full Name" onChange={handleChange} className={inputClass("name")} />
              <input name="email" placeholder="Email Address" onChange={handleChange} className={inputClass("email")} />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} className={inputClass("password")} />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className={inputClass("confirmPassword")} />

              <button disabled={loading} className="w-full bg-gradient-to-br from-[#004080] via-[#00b8ff] to-[#14b8a6] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-300 disabled:opacity-50">
                {loading ? "Sending OTP..." : "Register"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-700 mt-4">
              Already have an account?{" "}
              <span onClick={() => router.push("/login/admin")} className="text-[#00b8ff] font-medium cursor-pointer hover:underline">
                Login here
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center text-[#00b8ff] mb-3">Verify Email</h2>
            <p className="text-gray-700 mb-6 text-center">
              Enter the OTP sent to <span className="font-semibold">{form.email}</span>
            </p>

            {errors.general && <p className="text-red-500 text-center mb-3">{errors.general}</p>}

            <form onSubmit={handleOTPSubmit} className="space-y-4">
              <input name="otp" placeholder="Enter 6-digit OTP" onChange={handleChange} maxLength="6" className={inputClass("otp")} />
              <button disabled={loading} className="w-full bg-gradient-to-br from-[#004080] via-[#00b8ff] to-[#14b8a6] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-300 disabled:opacity-50">
                {loading ? "Verifying..." : "Verify OTP"}
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
