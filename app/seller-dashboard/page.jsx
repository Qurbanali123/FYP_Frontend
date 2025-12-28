"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const ICONS = [
  { id: 1, symbol: "🔒" },
  { id: 2, symbol: "🛡️" },
  { id: 3, symbol: "🔐" },
  { id: 4, symbol: "🧬" },
  { id: 5, symbol: "⚙️" },
  { id: 6, symbol: "🛰️" },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export default function SellerDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [floatingIcons, setFloatingIcons] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  
  const [filterBrand, setFilterBrand] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedBrand, setExpandedBrand] = useState(null);

  const [form, setForm] = useState({
    product_id: "",
    name: "",
    brand: "",
    batch_no: "",
    expiry_date: "",
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("sellerToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await fetch(`${API_BASE}/api/seller/my-products`, {
        method: "GET",
        headers,
        credentials: "include",
      });

      // If protected endpoint returns 401 and we don't have a token, try public endpoint
      if (res.status === 401) {
        if (!token) {
          const pub = await fetch(`${API_BASE}/api/products/all`);
          if (pub.ok) {
            const pubData = await pub.json();
            setProducts(Array.isArray(pubData) ? pubData : pubData.products || []);
            return;
          } else {
            return router.push("/login/seller");
          }
        } else {
          return router.push("/login/seller");
        }
      }

      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      console.error("fetchProducts error:", err);
      alert("Unable to load products.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Floating icons
  useEffect(() => {
    const iconsWithPositions = ICONS.map((icon, idx) => ({
      ...icon,
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 90}%`,
      key: `${icon.id}-${idx}`,
    }));
    setFloatingIcons(iconsWithPositions);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("sellerToken");
    router.push("/login/seller");
  };

  const updateForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("sellerToken");
      if (!token) return router.push("/login/seller");

      const res = await fetch(`${API_BASE}/api/seller/add-product`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (res.status === 401) return router.push("/login/seller");
      if (!res.ok) throw new Error("Add failed");

      const data = await res.json();
      
      alert("✅ Product added successfully!");
      
      if (data.qr_code) {
        setQrCode({
          productId: data.product_id,
          qrImage: data.qr_code
        });
      }
      
      setForm({ product_id: "", name: "", brand: "", batch_no: "", expiry_date: "" });
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      console.error("handleAdd error:", err);
      alert("Add failed");
    }
  };

  const startEdit = (product) => {
    setShowForm(true);
    setEditId(product.product_id);
    setForm({
      product_id: product.product_id,
      name: product.name,
      brand: product.brand,
      batch_no: product.batch_no,
      expiry_date: product.expiry_date,
    });
  };

  const saveEdit = async () => {
    try {
      const token = localStorage.getItem("sellerToken");
      if (!token) return router.push("/login/seller");

      const response = await fetch(
        `${API_BASE}/api/seller/edit/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );

      if (response.status === 401) return router.push("/login/seller");
      if (!response.ok) throw new Error("Edit failed");

      alert("Product updated successfully");
      fetchProducts();
      setEditId(null);
      setShowForm(false);
      setForm({ product_id: "", name: "", brand: "", batch_no: "", expiry_date: "" });
    } catch (error) {
      console.error("saveEdit error:", error);
      alert("Failed to update product");
    }
  };

  const deleteProduct = async (product_id) => {
    if (!confirm("Are you sure?")) return;

    try {
      const token = localStorage.getItem("sellerToken");
      if (!token) return router.push("/login/seller");

      const res = await fetch(`${API_BASE}/api/seller/delete/${product_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      if (res.status === 401) return router.push("/login/seller");
      if (!res.ok) throw new Error("Delete failed");

      alert("Product deleted");
      fetchProducts();
    } catch (err) {
      console.error("deleteProduct error:", err);
      alert("Delete failed");
    }
  };

  const getBrands = () => {
    return [...new Set(products.map((p) => p.brand).filter(Boolean))];
  };

  const getFilteredProducts = () => {
    return products.filter((p) => {
      const matchesBrand = !filterBrand || p.brand === filterBrand;
      const matchesSearch =
        !searchQuery ||
        (p.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.product_id || "").toLowerCase().includes(searchQuery.toLowerCase());
      return matchesBrand && matchesSearch;
    });
  };

  const groupedProducts = () => {
    const filtered = getFilteredProducts();
    const grouped = {};
    filtered.forEach((p) => {
      const brand = p.brand || "Uncategorized";
      if (!grouped[brand]) {
        grouped[brand] = [];
      }
      grouped[brand].push(p);
    });
    return grouped;
  };

  return (
    <section
      className="relative min-h-screen pt-20 px-6 text-white flex flex-col items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #001948 0%, #004080 70%, #00b8ff 100%)",
      }}
    >
      {/* Floating Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {floatingIcons.map((icon) => (
          <motion.div
            key={icon.key}
            className="absolute flex items-center justify-center rounded-full"
            style={{
              width: 28,
              height: 28,
              top: icon.top,
              left: icon.left,
              fontSize: 16,
              fontWeight: "bold",
              opacity: 0.2,
            }}
            animate={{ x: [0, 20, 0], y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            {icon.symbol}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center relative z-10">
        <h1 className="text-3xl font-extrabold">Seller Dashboard 🛍️</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold shadow-md"
        >
          Logout
        </button>
      </div>

      {/* Stats and Controls */}
      <div className="relative z-10 w-full max-w-6xl mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 ">
          <motion.div className="bg-blue-700 bg-opacity-20 backdrop-blur-md rounded-xl p-4 border border-white border-opacity-30 text-center "
            whileHover={{ scale: 1.05 }}>
            <p className="text-sm font-semibol to-black text-blue-100">Total Products</p>
            <p className="text-3xl font-bold text-white">{products.length}</p>
          </motion.div>
          <motion.div className="bg-blue-700 bg-opacity-20 backdrop-blur-md rounded-xl p-4 border border-white border-opacity-30 text-center"
            whileHover={{ scale: 1.05 }}>
            <p className="text-sm font-semibold text-blue-100">Brands</p>
            <p className="text-3xl font-bold text-white">{getBrands().length}</p>
          </motion.div>
          <motion.div className="bg-blue-700 bg-opacity-20 backdrop-blur-md rounded-xl p-4 border border-white border-opacity-30 text-center"
            whileHover={{ scale: 1.05 }}>
            <p className="text-sm font-semibold text-blue-100">Filtered Results</p>
            <p className="text-3xl font-bold text-white">{getFilteredProducts().length}</p>
          </motion.div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-blue-700 bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-30 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="🔍 Search by Product Name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white placeholder-blue-200 rounded-lg px-4 py-3 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white rounded-lg px-4 py-3 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
            >
              <option value="" className="text-gray-800">All Brands</option>
              {getBrands().map((brand) => (
                <option key={brand} value={brand} className="text-gray-800">
                  {brand}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setShowForm(true);
                setEditId(null);
                setForm({ product_id: "", name: "", brand: "", batch_no: "", expiry_date: "" });
              }}
              className="bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold transform hover:scale-105 transition"
            >
              ➕ Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="w-full max-w-4xl bg-white text-black rounded-lg p-5 mt-10 z-10 shadow-lg border border-teal-300">
          <h2 className="text-xl font-bold mb-4 text-teal-700">
            {editId ? "Edit Product" : "Add Product"}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              name="product_id"
              placeholder="Product ID"
              className="border p-2 rounded border-teal-400"
              value={form.product_id}
              onChange={updateForm}
              disabled={editId ? true : false}
            />
            <input name="name" placeholder="Name" className="border p-2 rounded border-teal-400" value={form.name} onChange={updateForm} />
            <input name="brand" placeholder="Brand" className="border p-2 rounded border-teal-400" value={form.brand} onChange={updateForm} />
            <input name="batch_no" placeholder="Batch No" className="border p-2 rounded border-teal-400" value={form.batch_no} onChange={updateForm} />
            <input name="expiry_date" placeholder="Expiry Date" className="border p-2 rounded border-teal-400" value={form.expiry_date} onChange={updateForm} />
          </div>

          <div className="mt-4 flex gap-4">
            <button onClick={editId ? saveEdit : handleAdd} className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded shadow-md">
              {editId ? "Save Changes" : "Add Product"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditId(null);
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {qrCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-10">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center text-teal-700">Product QR Code</h2>
            <p className="text-center text-gray-600 mb-4">Product ID: <span className="font-semibold">{qrCode.productId}</span></p>
            <div className="flex justify-center mb-6">
              <img src={qrCode.qrImage} alt="Product QR Code" className="w-64 h-64 border-2 border-teal-500" />
            </div>
            <div className="flex gap-3 justify-center">
              <a
                href={qrCode.qrImage}
                download={`${qrCode.productId}-qr-code.png`}
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded font-semibold"
              >
                📥 Download
              </a>
              <button
                onClick={() => {
                  const printWindow = window.open('', '', 'width=600,height=600');
                  printWindow.document.write(`<img src="${qrCode.qrImage}" style="width:100%;"/>`);
                  printWindow.document.close();
                  printWindow.print();
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
              >
                🖨️ Print
              </button>
              <button
                onClick={() => setQrCode(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Display */}
      <div className="relative z-10 w-full max-w-6xl mb-10 mt-15">
        {loading ? (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-lg text-center py-10"
          >
            ⏳ Loading products...
          </motion.div>
        ) : !Array.isArray(products) || products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-700 bg-opacity-10 backdrop-blur-md rounded-xl p-8 text-center border border-white border-opacity-30"
          >
            <p className="text-xl text-blue-100">📦 No products found. Start by adding your first product!</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedProducts()).map(([brand, brandProducts]) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue bg-opacity-10 backdrop-blur-md rounded-xl border border-white border-opacity-30 overflow-hidden"
              >
                {/* Brand Header - Dropdown */}
                <button
                  onClick={() =>
                    setExpandedBrand(expandedBrand === brand ? null : brand)
                  }
                  className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">🏷️</span>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white">{brand}</h3>
                      <p className="text-sm text-blue-100">
                        {brandProducts.length} product{brandProducts.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedBrand === brand ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expandedBrand === brand ? (
                      <ChevronUp className="w-6 h-6 text-white" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-white" />
                    )}
                  </motion.div>
                </button>

                {/* Products Grid - Collapsible */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedBrand === brand ? "auto" : 0,
                    opacity: expandedBrand === brand ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-black bg-opacity-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {brandProducts.map((product) => (
                      <motion.div
                        key={product.product_id}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-blue-600 rounded-lg p-5 border border-white border-opacity-30 hover:border-opacity-50 transition shadow-lg"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-xs font-semibold text-blue-200">ID</p>
                              <p className="text-lg font-bold text-white break-all">
                                {product.product_id}
                              </p>
                            </div>
                            <span className="text-2xl">📦</span>
                          </div>

                          <div className="bg-white bg-opacity-10 rounded px-3 py-2">
                            <p className="text-xs font-semibold text-gray-700">Product Name</p>
                            <p className="text-gray font-semibold">
                              {product.name}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-blue-600 bg-opacity-10 rounded px-3 py-2">
                              <p className="text-xs font-semibold text-blue-200">
                                Batch
                              </p>
                              <p className="text-white text-sm font-medium">
                                {product.batch_no}
                              </p>
                            </div>
                            <div className="bg-blue-600 bg-opacity-10 rounded px-3 py-2">
                              <p className="text-xs font-semibold text-blue-200">
                                Expiry
                              </p>
                              <p className="text-white text-sm font-medium">
                                {product.expiry_date}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => startEdit(product)}
                              className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-3 py-2 rounded-lg font-semibold text-sm shadow-md transition"
                            >
                              ✏️ Edit
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => deleteProduct(product.product_id)}
                              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg font-semibold text-sm shadow-md transition"
                            >
                              🗑️ Delete
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {getFilteredProducts().length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 text-center border border-white border-opacity-30"
              >
                <p className="text-xl text-blue-100">
                  🔍 No products match your filters
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}