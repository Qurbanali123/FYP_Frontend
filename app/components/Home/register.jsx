"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    company: "",
    owner: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    // Rejects invalid endings like ".comcom"
    const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    return regex.test(email) && !email.match(/\.comcom|\.coom|\.comm/i);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(form.email)) {
      setError("Invalid email format!");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      alert("Registration successful!");
      router.push("/login");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-teal-700">
          Manufacturer Registration
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          required
          onChange={handleChange}
          className="w-full p-3 border rounded mb-3"
        />
        <input
          type="text"
          name="owner"
          placeholder="Owner Name"
          required
          onChange={handleChange}
          className="w-full p-3 border rounded mb-3"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          onChange={handleChange}
          className="w-full p-3 border rounded mb-3"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="w-full p-3 border rounded mb-3"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-teal-600 text-white font-semibold py-3 rounded hover:bg-teal-700 transition-all"
        >
          Register
        </button>
      </form>
    </div>
  );
}
