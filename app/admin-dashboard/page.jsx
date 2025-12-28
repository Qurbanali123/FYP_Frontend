"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ManageSellers from "@/app/components/admin/ManageSellers";
import ManageAdmins from "@/app/components/admin/ManageAdmins";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const stored = localStorage.getItem("adminData");

    if (!token) {
      router.push("/login/admin");
      return;
    }

    if (stored) {
      try {
        setAdminData(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing admin data:", e);
      }
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminData");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex mt-20">
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-gradient-to-b from-[#001948] to-[#004080] text-white p-6 shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-8 text-[#00b8ff]">Admin Panel</h1>

        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full text-left py-3 px-4 rounded-lg transition duration-300 ${
              activeTab === "overview"
                ? "bg-[#00b8ff] text-[#001948] font-semibold"
                : "hover:bg-[#00b8ff]/20"
            }`}
          >
            📊 Dashboard
          </button>

          <button
            onClick={() => setActiveTab("sellers")}
            className={`w-full text-left py-3 px-4 rounded-lg transition duration-300 ${
              activeTab === "sellers"
                ? "bg-[#00b8ff] text-[#001948] font-semibold"
                : "hover:bg-[#00b8ff]/20"
            }`}
          >
            🏪 Manage Sellers
          </button>

          <button
            onClick={() => setActiveTab("admins")}
            className={`w-full text-left py-3 px-4 rounded-lg transition duration-300 ${
              activeTab === "admins"
                ? "bg-[#00b8ff] text-[#001948] font-semibold"
                : "hover:bg-[#00b8ff]/20"
            }`}
          >
            👥 Manage Admins
          </button>
        </nav>

        <div className="mt-12 pt-6 border-t border-[#00b8ff]/20">
          <div className="text-sm mb-4">
            <p className="text-gray-300">Logged in as:</p>
            <p className="text-[#00b8ff] font-semibold">{adminData?.name || "Admin"}</p>
            <p className="text-gray-400 text-xs">{adminData?.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition duration-300 font-semibold"
          >
            Logout
          </button>
        </div>
      </motion.aside>

      <main className="flex-1 p-8">
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-[#001948] mb-8">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#00b8ff]"
              >
                <p className="text-gray-600 text-sm">Total Sellers</p>
                <p className="text-4xl font-bold text-[#00b8ff] mt-2">-</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500"
              >
                <p className="text-gray-600 text-sm">Pending Sellers</p>
                <p className="text-4xl font-bold text-yellow-500 mt-2">-</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500"
              >
                <p className="text-gray-600 text-sm">Approved Sellers</p>
                <p className="text-4xl font-bold text-green-500 mt-2">-</p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#004080]"
              >
                <p className="text-gray-600 text-sm">Total Admins</p>
                <p className="text-4xl font-bold text-[#004080] mt-2">-</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500"
              >
                <p className="text-gray-600 text-sm">Pending Admins</p>
                <p className="text-4xl font-bold text-orange-500 mt-2">-</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-teal-500"
              >
                <p className="text-gray-600 text-sm">Blocked Accounts</p>
                <p className="text-4xl font-bold text-teal-500 mt-2">-</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === "sellers" && <ManageSellers />}

        {activeTab === "admins" && <ManageAdmins />}
      </main>
    </div>
  );
}
