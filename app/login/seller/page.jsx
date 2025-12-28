"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SellerLogin() {
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://fyp-backend-one-bice.vercel.app/api/auth/login/seller`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const ct = res.headers.get("content-type") || "";
      let data;
      if (ct.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        const msg = text && text.length < 1000 ? text : `Unexpected non-JSON response (status ${res.status})`;
        setError(msg || "Server error. Try again later.");
        setLoading(false);
        return;
      }

      if (res.ok) {
        localStorage.setItem("sellerId", data.seller?.id || "");
        localStorage.setItem("sellerToken", data.token || "");
        localStorage.setItem("sellerData", JSON.stringify(data.seller || {}));

        router.push("/seller-dashboard");
      } else {
        setError(data?.message || `Login failed (${res.status})`);
      }
    } catch (err) {
      console.error(err);
      setError(err?.message || "Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center p-6"
      style={{ background: "linear-gradient(135deg, #000a1f 0%, #001f3f 50%, #003d66 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-[#00b8ff] text-center">Seller Login</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00b8ff]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00b8ff]"
            required
          />

          <div className="text-right">
            <span
              onClick={() => router.push("/login/seller/forgot-password")}
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

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => router.push("/register/seller")}
            className="text-[#00b8ff] cursor-pointer hover:underline font-medium"
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
}
