"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CustomerRegister() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateName = (name) => /^[A-Za-z\s]{3,}$/.test(name);

  const validateEmail = (email) => {
    const emailRegex =
      /^[a-z0-9._%+-]+@[a-z0-9-]+(\.(com(\.pk)?|[a-z]{2,}))$/;
    const invalidPatterns =
      /(\.\.)|(\.-)|(-\.)|(\.com\.com)|(\.pk\.pk)|(\.com\.pk\.pk)/;
    if (/[A-Z]/.test(email)) return false;
    if (invalidPatterns.test(email)) return false;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^[A-Z](?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    let error = "";

    if (name === "name" && value && !validateName(value)) {
      error = "Name must contain only letters and spaces (min 3 characters).";
    }

    if (name === "email") {
      if (/[A-Z]/.test(value)) {
        error = "Email must be lowercase only.";
      } else if (value && !validateEmail(value)) {
        error =
          "Invalid email — avoid .com.com, .pk.pk, double dots, or special patterns.";
      }
    }

    if (name === "password" && value && !validatePassword(value)) {
      error =
        "Password must start with a capital letter, contain at least one number and one special character.";
    }

    if (name === "confirmPassword" && value !== form.password) {
      error = "Passwords do not match.";
    }

    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateName(form.name)) {
      setErrors({ name: "Please enter a valid name (letters and spaces only)." });
      return;
    }

    if (!validateEmail(form.email)) {
      setErrors({
        email:
          "Invalid email (must be lowercase and not contain invalid patterns like .com.com or .pk.pk).",
      });
      return;
    }

    if (!validatePassword(form.password)) {
      setErrors({
        password:
          "Password must start with a capital letter and include at least one number and one special character.",
      });
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/register/customer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            password: form.password.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message || "Something went wrong." });
        return;
      }

      alert("Customer Registered Successfully!");
      router.push("/login/customer");
    } catch (err) {
      console.error("Error:", err);
      setErrors({ general: "Server error. Please try again later." });
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
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: "linear-gradient(135deg, #000a1f 0%, #001f3f 50%, #003d66 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-[#00b8ff] mb-2 text-center drop-shadow-lg">
          Customer Registration
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          Create your customer account
        </p>

        {errors.general && (
          <p className="text-red-600 text-center mb-4">{errors.general}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full bg-gradient-to-br from-[#004080] via-[#00b8ff] to-[#14b8a6] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login/customer")}
            className="text-[#00b8ff] cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </motion.div>
    </div>
  );
}
