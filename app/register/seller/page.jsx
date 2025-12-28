"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ManufacturerRegister() {
  const router = useRouter();
  const [step, setStep] = useState("registration");
  const [form, setForm] = useState({
    companyName: "",
    ownerName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ---------------- VALIDATIONS ----------------

  const validateEmail = (email) => {
    const emailRegex =
      /^[a-z0-9._%+-]+@(?!(?:.*\.-)|(?:.*-\.)|(?:.*--)|(?:.*\.\.))[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}$/;
    if (/[A-Z]/.test(email)) return false;
    const invalidDoubleTLD = /\.(com|pk|net|org)\.\1/;
    if (invalidDoubleTLD.test(email)) return false;
    return emailRegex.test(email);
  };

  const validateOwnerName = (name) => /^[A-Za-z\s]{3,}$/.test(name);

  const validatePassword = (password) =>
    /^[A-Z](?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,}$/.test(password);

  // ---------------- HANDLERS ----------------

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    let error = "";

    if (name === "email" && value && !validateEmail(value))
      error = "Invalid email format.";

    if (name === "ownerName" && value && !validateOwnerName(value))
      error = "Owner name must contain only letters and spaces.";

    if (name === "password" && value && !validatePassword(value))
      error =
        "Password must start with a capital letter, include one number & one special character.";

    if (name === "confirmPassword" && value !== form.password)
      error = "Passwords do not match.";

    setErrors({ ...errors, [name]: error });
  };

  // ---------------- REGISTER ----------------

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateEmail(form.email))
      return setErrors({ email: "Invalid email address" });

    if (!validateOwnerName(form.ownerName))
      return setErrors({ ownerName: "Invalid owner name" });

    if (!validatePassword(form.password))
      return setErrors({ password: "Invalid password format" });

    if (form.password !== form.confirmPassword)
      return setErrors({ confirmPassword: "Passwords do not match" });

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/register/seller`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            companyName: form.companyName,
            ownerName: form.ownerName,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message || "Registration failed" });
        return;
      }

      setStep("otp");
    } catch (err) {
      console.error(err);
      setErrors({ general: "Server error. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  // ---------------- OTP ----------------

  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    if (!form.otp || form.otp.length !== 6)
      return setErrors({ otp: "Enter valid 6-digit OTP" });

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/verify-otp/seller`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: form.email,
            otp: form.otp,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors({ otp: data.message || "OTP verification failed" });
        return;
      }

      router.push(
        `/account-status?email=${encodeURIComponent(form.email)}&type=seller`
      );
    } catch (err) {
      console.error(err);
      setErrors({ general: "Server error. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------

  const inputClass = (field) =>
    `w-full border rounded-lg p-3 focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-500 focus:ring-red-400"
        : "border-gray-300 focus:ring-[#00b8ff]"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-20 bg-gradient-to-br from-[#000a1f] via-[#001f3f] to-[#003d66] text-blackn">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-md text-black"
      >
        {step === "registration" ? (
          <>
            <h2 className="text-3xl font-bold text-[#00b8ff] text-center mb-4">
              Manufacturer Registration
            </h2>

            {errors.general && (
              <p className="text-red-600 text-center mb-4">{errors.general}</p>
            )}

            <form onSubmit={handleRegistrationSubmit} className="space-y-4">
              <input
                name="companyName"
                placeholder="Company Name"
                value={form.companyName}
                onChange={handleChange}
                className={inputClass("companyName")}
                required
              />

              <input
                name="ownerName"
                placeholder="Owner Name"
                value={form.ownerName}
                onChange={handleChange}
                className={inputClass("ownerName")}
                required
              />

              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className={inputClass("email")}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={inputClass("password")}
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={inputClass("confirmPassword")}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#004080] to-[#00b8ff] text-white py-3 rounded-lg font-semibold"
              >
                {loading ? "Sending OTP..." : "Register"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-[#00b8ff] text-center mb-4">
              Verify OTP
            </h2>

            <form onSubmit={handleOTPSubmit} className="space-y-4">
              <input
                name="otp"
                placeholder="6-digit OTP"
                value={form.otp}
                onChange={handleChange}
                maxLength="6"
                className={inputClass("otp")}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#004080] to-[#00b8ff] text-white py-3 rounded-lg font-semibold"
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
