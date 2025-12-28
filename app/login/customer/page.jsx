"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/api/auth/login/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const ct = response.headers.get("content-type") || "";
      let data;
      if (ct.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        setError(text || `Unexpected response (status ${response.status})`);
        return;
      }

      if (!response.ok) {
        setError(data?.message || `Invalid credentials (${response.status})`);
        return;
      }

      alert("Login successful! Welcome, customer 🎉");
      localStorage.setItem("customerToken", data.token || "");
      router.push("/customer-dashboard");
    } catch (err) {
      console.error("Error:", err);
      setError(err?.message || "Server error. Please try again later.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #000a1f 0%, #001f3f 50%, #003d66 100%)" }}
    >
      <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#00b8ff] mb-2 text-center">
          Customer Login
        </h2>
        <p className="text-gray-500 mb-6 text-center">Access your account</p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00b8ff]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00b8ff]"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-[#004080] via-[#00b8ff] to-[#14b8a6] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register/customer")}
            className="text-[#00b8ff] cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
