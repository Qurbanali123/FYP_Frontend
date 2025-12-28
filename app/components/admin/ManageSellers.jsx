"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ManageSellers() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const [filters, setFilters] = useState("all");

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch("/api/admin/sellers", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Cookie": `token=${token}`
        },
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sellers");
      }

      const data = await response.json();
      setSellers(data.sellers || []);
      setError("");
    } catch (err) {
      console.error("Error fetching sellers:", err);
      setError("Failed to load sellers");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (sellerId, action) => {
    setActionLoading(`${sellerId}-${action}`);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`/api/admin/sellers/${sellerId}/${action}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Cookie": `token=${token}`
        },
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} seller`);
      }

      await fetchSellers();
    } catch (err) {
      console.error(`Error ${action} seller:`, err);
      alert(`Failed to ${action} seller: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (sellerId) => {
    if (!confirm("Are you sure you want to delete this seller?")) return;

    setActionLoading(`${sellerId}-delete`);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`/api/admin/sellers/${sellerId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Cookie": `token=${token}`
        },
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Failed to delete seller");
      }

      await fetchSellers();
    } catch (err) {
      console.error("Error deleting seller:", err);
      alert(`Failed to delete seller: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredSellers = sellers.filter((seller) => {
    if (filters === "all") return true;
    return seller.status === filters;
  });

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "blocked":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600">Loading sellers...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold text-[#001948] mb-8">Manage Sellers</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setFilters("all")}
          className={`px-4 py-2 rounded-lg transition ${
            filters === "all"
              ? "bg-[#00b8ff] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All ({sellers.length})
        </button>
        <button
          onClick={() => setFilters("pending")}
          className={`px-4 py-2 rounded-lg transition ${
            filters === "pending"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Pending ({sellers.filter((s) => s.status === "pending").length})
        </button>
        <button
          onClick={() => setFilters("approved")}
          className={`px-4 py-2 rounded-lg transition ${
            filters === "approved"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Approved ({sellers.filter((s) => s.status === "approved").length})
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Company</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Owner</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSellers.map((seller) => (
              <motion.tr
                key={seller.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-900">{seller.company_name}</td>
                <td className="px-6 py-4 text-gray-700">{seller.owner_name}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">{seller.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeColor(seller.status)}`}>
                    {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {seller.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleAction(seller.id, "approve")}
                          disabled={actionLoading === `${seller.id}-approve`}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm disabled:opacity-50"
                        >
                          {actionLoading === `${seller.id}-approve` ? "..." : "Approve"}
                        </button>
                        <button
                          onClick={() => handleAction(seller.id, "reject")}
                          disabled={actionLoading === `${seller.id}-reject`}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm disabled:opacity-50"
                        >
                          {actionLoading === `${seller.id}-reject` ? "..." : "Reject"}
                        </button>
                      </>
                    )}
                    {seller.status === "approved" && (
                      <button
                        onClick={() => handleAction(seller.id, "block")}
                        disabled={actionLoading === `${seller.id}-block`}
                        className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition text-sm disabled:opacity-50"
                      >
                        {actionLoading === `${seller.id}-block` ? "..." : "Block"}
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(seller.id)}
                      disabled={actionLoading === `${seller.id}-delete`}
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition text-sm disabled:opacity-50"
                    >
                      {actionLoading === `${seller.id}-delete` ? "..." : "Delete"}
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredSellers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No sellers found with the selected filter.
          </div>
        )}
      </div>
    </motion.div>
  );
}
