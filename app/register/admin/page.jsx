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

    if (!validateEmail(form.email))
      return setErrors({ email: "Invalid email address" });

    if (!validateName(form.name))
      return setErrors({ name: "Invalid name" });

    if (!validatePassword(form.password))
      return setErrors({ password: "Weak password" });

    if (form.password !== form.confirmPassword)
      return setErrors({ confirmPassword: "Passwords do not match" });

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${API_URL}/api/admin/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
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

    if (form.otp.length !== 6)
      return setErrors({ otp: "Invalid OTP" });

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${API_URL}/api/admin/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          otp: form.otp,
        }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        setErrors({ otp: data.message || "OTP failed" });
        return;
      }

      router.push(
        `/account-status?email=${encodeURIComponent(form.email)}&type=admin`
      );
    } catch (error) {
      console.error(error);
      setErrors({ general: "Server error" });
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  const inputClass = (field) =>
    `w-full border rounded-lg p-3 ${
      errors[field] ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-20">
      <motion.div className="bg-white rounded-xl p-6 w-full max-w-md">
        {step === "registration" ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Admin Registration
            </h2>

            {errors.general && (
              <p className="text-red-500 text-center">{errors.general}</p>
            )}

            <form onSubmit={handleRegistrationSubmit} className="space-y-4">
              <input name="name" placeholder="Name" onChange={handleChange} className={inputClass("name")} />
              <input name="email" placeholder="Email" onChange={handleChange} className={inputClass("email")} />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} className={inputClass("password")} />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className={inputClass("confirmPassword")} />

              <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
                {loading ? "Sending OTP..." : "Register"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>

            <form onSubmit={handleOTPSubmit} className="space-y-4">
              <input name="otp" placeholder="6-digit OTP" onChange={handleChange} className={inputClass("otp")} />
              <button disabled={loading} className="w-full bg-green-600 text-white py-2 rounded">
                {loading ? "Verifying..." : "Verify"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
