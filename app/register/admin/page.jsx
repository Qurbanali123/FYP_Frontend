"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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

  const validateEmail = (email) => {
    const emailRegex =
      /^[a-z0-9._%+-]+@(?!(?:.*\.-)|(?:.*-\.)|(?:.*--)|(?:.*\.\.))[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}$/;
    if (/[A-Z]/.test(email)) return false;
    const invalidDoubleTLD = /\.(com|pk|net|org)\.\1/;
    if (invalidDoubleTLD.test(email)) return false;
    return emailRegex.test(email);
  };

  const validateName = (name) => /^[A-Za-z\s]{3,}$/.test(name);

  const validatePassword = (password) =>
    /^[A-Z](?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,}$/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    let error = "";

    if (name === "email" && value && !validateEmail(value)) {
      error =
        "Invalid email format: avoid uppercase letters, double domain (.com.com, .pk.pk), or invalid structure.";
    }

    if (name === "name" && value && !validateName(value)) {
      error = "Name must contain only letters and spaces.";
    }

    if (name === "password" && value && !validatePassword(value)) {
      error =
        "Password must start with a capital letter, include at least one number and one special character.";
    }

    if (name === "confirmPassword" && value !== form.password) {
      error = "Passwords do not match.";
    }

    setErrors({ ...errors, [name]: error });
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(form.email)) {
      setErrors({
        email:
          "Invalid email address: avoid uppercase letters, double domain (.com.com, .pk.pk), or invalid structure.",
      });
      return;
    }

    if (!validateName(form.name)) {
      setErrors({
        name: "Name must contain only letters and spaces.",
      });
      return;
    }

    if (!validatePassword(form.password)) {
      setErrors({
        password:
          "Password must start with a capital letter, include at least one number and one special character.",
      });
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message || "Registration failed" });
        return;
      }

      setStep("otp");
      setErrors({});
    } catch (err) {
      console.error("Error:", err);
      setErrors({ general: "Something went wrong. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    if (!form.otp || form.otp.length !== 6) {
      setErrors({ otp: "Please enter a valid 6-digit OTP" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          otp: form.otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ otp: data.message || "OTP verification failed" });
        return;
      }

      router.push(`/account-status?email=${encodeURIComponent(form.email)}&type=admin`);
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
        : form[field]
        ? "border-green-500 focus:ring-green-400"
        : "border-gray-300 focus:ring-[#00b8ff]"
    }`;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 pt-20"
      style={{
        background: "linear-gradient(135deg, #000a1f 0%, #001f3f 50%, #003d66 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-md"
      >
        {step === "registration" ? (
          <>
            <h2 className="text-3xl font-bold text-[#00b8ff] mb-3 text-center drop-shadow-lg">
              Admin Registration
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              Create your admin account
            </p>

            {errors.general && (
              <p className="text-red-600 text-center mb-4">{errors.general}</p>
            )}

            <form onSubmit={handleRegistrationSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className={inputClass("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={inputClass("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className={inputClass("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className={inputClass("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-br from-[#004080] via-[#00b8ff] to-[#14b8a6] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-300 disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Register"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-700 mt-4">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/login/admin")}
                className="text-[#00b8ff] font-medium cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-[#00b8ff] mb-3 text-center drop-shadow-lg">
              Verify Email
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              Enter the OTP sent to <span className="font-semibold">{form.email}</span>
            </p>

            {errors.general && (
              <p className="text-red-600 text-center mb-4">{errors.general}</p>
            )}

            <form onSubmit={handleOTPSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  value={form.otp}
                  onChange={handleChange}
                  maxLength="6"
                  required
                  className={inputClass("otp")}
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-br from-[#004080] via-[#00b8ff] to-[#14b8a6] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-300 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>

            <button
              onClick={() => setStep("registration")}
              className="w-full mt-4 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition duration-300"
            >
              Back
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
