"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setErrors({ general: "Please enter email and password" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const ct = response.headers.get("content-type") || "";
      let data;
      if (ct.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        setErrors({ general: text || `Unexpected response (status ${response.status})` });
        setLoading(false);
        return;
      }

      if (!response.ok) {
        setErrors({ general: data?.message || `Login failed (${response.status})` });
        return;
      }

      localStorage.setItem("token", data.token || "");
      localStorage.setItem("adminData", JSON.stringify(data.admin || {}));
      router.push("/admin-dashboard");
    } catch (err) {
      console.error("Error:", err);
      setErrors({ general: err?.message || "Something went wrong. Please try again later." });
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
        <h2 className="text-3xl font-bold text-[#00b8ff] mb-3 text-center drop-shadow-lg">
          Admin Login
        </h2>
        <p className="text-gray-700 mb-6 text-center">
          Access your admin dashboard
        </p>

        {errors.general && (
          <p className="text-red-600 text-center mb-4">{errors.general}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClass("email")}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className={inputClass("password")}
          />

          <div className="text-right">
            <span
              onClick={() => router.push("/login/admin/forgot-password")}
              className="text-[#00b8ff] text-sm font-medium cursor-pointer hover:underline"
            >
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-br from-[#004080] via-[#00b8ff] to-[#14b8a6] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-700 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => router.push("/register/admin")}
            className="text-[#00b8ff] font-medium cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </motion.div>
    </div>
  );
}
