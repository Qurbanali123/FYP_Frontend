"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QrScanner from "qr-scanner";
import { QrCode, Search, CheckCircle, AlertCircle, History, Zap, Shield } from "lucide-react";

export default function CustomerDashboard() {
  const [verifyMethod, setVerifyMethod] = useState("id");
  const [productId, setProductId] = useState("");
  const [result, setResult] = useState("");
  const [product, setProduct] = useState(null);
  const [recentVerifications, setRecentVerifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cameraStatus, setCameraStatus] = useState("initializing");
  const videoRef = useRef(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("recentVerifications");
    if (stored) {
      setRecentVerifications(JSON.parse(stored));
    }
  }, []);

  const addToRecentVerifications = (productData) => {
    const newVerification = {
      id: productData.id || productId,
      name: productData.name,
      timestamp: new Date().toLocaleString(),
      status: "verified",
    };
    const updated = [newVerification, ...recentVerifications.slice(0, 4)];
    setRecentVerifications(updated);
    localStorage.setItem("recentVerifications", JSON.stringify(updated));
  };

  const handleVerifyById = async () => {
    if (!productId.trim()) {
      setResult("❌ Please enter a product ID");
      setProduct(null);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/seller/verify/${productId.trim()}`);

      if (res.status === 404) {
        setProduct(null);
        setResult("❌ This product is not registered — may be fake.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      
      const isAuthentic = data.authenticity && data.authenticity.includes("✅");
      
      if (isAuthentic) {
        setProduct(data.product);
        addToRecentVerifications({ ...data.product, id: data.product.product_id });
      } else {
        setProduct(null);
      }
      
      setResult(data.authenticity);
    } catch (err) {
      console.error(err);
      setResult("❌ Error verifying product");
      setProduct(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isComponentMounted = true;

    if (verifyMethod === "qr") {
      const initScanner = async () => {
        // Clean up existing scanner
        if (scannerRef.current) {
          try {
            await scannerRef.current.stop();
            scannerRef.current.destroy();
          } catch (e) {
            console.error("Error cleaning up old scanner:", e);
          }
          scannerRef.current = null;
        }

        try {
          console.log("Initializing QR Scanner...");
          if (isComponentMounted) {
            setCameraStatus("checking");
          }
          
          // Check if camera is available
          const hasCamera = await QrScanner.hasCamera();
          console.log("Camera available:", hasCamera);
          
          if (!hasCamera) {
            if (isComponentMounted) {
              setCameraStatus("unavailable");
              setResult("❌ No camera found on this device");
            }
            return;
          }

          if (!videoRef.current) {
            console.error("Video ref not available");
            return;
          }

          const scanner = new QrScanner(
            videoRef.current,
            async (data) => {
              try {
                const scannedData = String(data?.data || data).trim();
                console.log("QR Code scanned:", scannedData);
                
                if (!scannedData) {
                  console.warn("Empty QR code data");
                  return;
                }

                let productId = scannedData;
                
                try {
                  const parsedData = JSON.parse(scannedData);
                  productId = parsedData.productId || scannedData;
                } catch (e) {
                  productId = scannedData;
                }

                console.log("Extracted Product ID:", productId);

                if (!isComponentMounted) return;
                setLoading(true);

                const res = await fetch(`/api/seller/verify/${productId}`);

                if (!isComponentMounted) return;

                if (res.status === 404) {
                  setProduct(null);
                  setResult("❌ This product is not registered — may be fake.");
                  setLoading(false);
                  return;
                }

                const json = await res.json();
                
                const isAuthentic = json.authenticity && json.authenticity.includes("✅");
                
                if (isAuthentic) {
                  setProduct(json.product);
                  addToRecentVerifications({ ...json.product, id: json.product.product_id });
                } else {
                  setProduct(null);
                }
                
                setResult(json.authenticity);
                setLoading(false);
              } catch (err) {
                console.error("Verification error:", err);
                if (isComponentMounted) {
                  setResult("❌ Error verifying product");
                  setProduct(null);
                  setLoading(false);
                }
              }
            },
            {
              preferredCamera: "environment",
              highlightCodeOutline: true,
              maxScansPerSecond: 5,
              returnDetailedScanResult: true,
            }
          );

          console.log("Starting scanner...");
          await scanner.start();
          console.log("Scanner started successfully");
          
          if (isComponentMounted) {
            setCameraStatus("active");
            scannerRef.current = scanner;
          } else {
            scanner.stop();
            scanner.destroy();
          }
        } catch (err) {
          console.error("Scanner initialization error:", err);
          if (isComponentMounted) {
            setCameraStatus("error");
            setResult(`❌ Camera Error: ${err.message}`);
          }
        }
      };

      const timer = setTimeout(initScanner, 500);

      return () => {
        clearTimeout(timer);
        isComponentMounted = false;
        if (scannerRef.current) {
          try {
            scannerRef.current.stop();
            scannerRef.current.destroy();
            scannerRef.current = null;
          } catch (e) {
            console.error("Error cleaning up scanner on unmount:", e);
          }
        }
      };
    }
  }, [verifyMethod]);



  const isSuccess = result.includes("✅");

  return (
    <div className="min-h-screen pt-24 pb-12 mt-20" style={{ background: "linear-gradient(135deg, #000a1f 0%, #001f3f 50%, #003d66 100%)" }}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#006699] to-[#004d5c] rounded-full blur-3xl opacity-8"
          animate={{ x: [0, 50, 0], y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.08 }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-l from-[#001f3f] to-[#006699] rounded-full blur-3xl opacity-8"
          animate={{ x: [0, -60, 0], y: [0, -50, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.08 }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Welcome Back <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">Customer</span>
            </h1>
            <p className="text-cyan-100">Verify your products with blockchain authenticity</p>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {[
            { icon: Shield, label: "Products Verified", value: "24", color: "from-teal-500 to-cyan-500" },
            { icon: Zap, label: "Verification Speed", value: "<1s", color: "from-cyan-500 to-blue-500" },
            { icon: CheckCircle, label: "Success Rate", value: "100%", color: "from-blue-500 to-indigo-500" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className={`bg-gradient-to-br ${stat.color} bg-opacity-20 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300`}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-100 text-sm font-medium mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <stat.icon size={40} className="text-teal-300 opacity-60" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Verification Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Shield className="text-teal-400" size={28} />
                Product Verification
              </h2>

              {/* Method Selection */}
              <div className="flex gap-4 mb-8">
                {[
                  { value: "id", label: "Enter Product ID", icon: Search },
                  { value: "qr", label: "Scan QR Code", icon: QrCode },
                ].map((method) => (
                  <motion.button
                    key={method.value}
                    onClick={() => {
                      setVerifyMethod(method.value);
                      setResult("");
                      setProduct(null);
                      setProductId("");
                      if (method.value === "qr") {
                        setCameraStatus("initializing");
                      }
                    }}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      verifyMethod === method.value
                        ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
                        : "bg-white/10 text-cyan-100 border border-cyan-400/30 hover:bg-white/20"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <method.icon size={20} />
                    {method.label}
                  </motion.button>
                ))}
              </div>

              {/* Verification Methods */}
              <AnimatePresence mode="wait">
                {verifyMethod === "id" && (
                  <motion.div
                    key="id-method"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Enter your product ID (e.g., PROD-12345)"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleVerifyById()}
                        className="w-full bg-white/20 border border-cyan-400/50 rounded-xl p-4 placeholder-cyan-200/60 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition duration-300"
                      />
                      <motion.button
                        onClick={handleVerifyById}
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-xl font-bold hover:opacity-90 transition duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {loading ? "Verifying..." : "Verify Product"}
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {verifyMethod === "qr" && (
                  <motion.div
                    key="qr-method"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center"
                  >
                    {/* Camera Status */}
                    {cameraStatus !== "active" && (
                      <div className="mb-6 p-4 bg-blue-500/30 border border-blue-400/60 rounded-xl text-blue-200 text-sm text-center max-w-xs">
                        {cameraStatus === "initializing" && "🔄 Initializing camera..."}
                        {cameraStatus === "checking" && "🔍 Checking camera permissions..."}
                        {cameraStatus === "unavailable" && "📷 Camera not found"}
                        {cameraStatus === "error" && "⚠️ Camera access denied or error occurred"}
                      </div>
                    )}

                    <div className="relative mb-6">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl blur-lg opacity-30"
                        animate={{ opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <video
                        ref={videoRef}
                        className="relative w-80 h-80 border-2 border-teal-400/60 rounded-2xl bg-black"
                        autoPlay={true}
                        muted={true}
                        playsInline={true}
                        disablePictureInPicture={true}
                        style={{
                          objectFit: "cover",
                          display: "block",
                          width: "100%",
                          height: "100%",
                          borderRadius: "1rem",
                        }}
                      />
                      <div className="absolute inset-0 border-2 border-teal-400 rounded-2xl pointer-events-none">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-teal-400"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-teal-400"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-teal-400"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-teal-400"></div>
                      </div>
                    </div>
                    <p className="text-cyan-200 text-center mt-4">
                      Point your camera at the QR code on the product packaging
                    </p>
                    <div className="mt-6 text-center text-sm">
                      <p className="text-cyan-300/70 mb-3">
                        💡 Troubleshooting Tips:
                      </p>
                      <ul className="text-cyan-300/60 text-xs space-y-1">
                        <li>• Check browser camera permissions in settings</li>
                        <li>• Ensure no other app is using the camera</li>
                        <li>• Try refreshing the page</li>
                        <li>• Use HTTPS connection for camera access</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Result Message */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`mt-8 p-6 rounded-2xl font-semibold flex items-center gap-3 ${
                      isSuccess
                        ? "bg-emerald-500/30 border border-emerald-400/60 text-emerald-100"
                        : "bg-red-500/30 border border-red-400/60 text-red-100"
                    }`}
                  >
                    {isSuccess ? (
                      <CheckCircle size={24} className="text-emerald-400" />
                    ) : (
                      <AlertCircle size={24} className="text-red-400" />
                    )}
                    {result}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Product Details Card */}
              <AnimatePresence>
                {product && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-8 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/40 rounded-2xl p-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <CheckCircle className="text-emerald-400" size={24} />
                      Product Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-cyan-200 text-xs font-semibold uppercase tracking-wide">Product Name</p>
                        <p className="text-white font-semibold mt-1">{product.name}</p>
                      </div>
                      <div>
                        <p className="text-cyan-200 text-xs font-semibold uppercase tracking-wide">Brand</p>
                        <p className="text-white font-semibold mt-1">{product.brand}</p>
                      </div>
                      <div>
                        <p className="text-cyan-200 text-xs font-semibold uppercase tracking-wide">Batch Number</p>
                        <p className="text-white font-semibold mt-1">{product.batch_no}</p>
                      </div>
                      <div>
                        <p className="text-cyan-200 text-xs font-semibold uppercase tracking-wide">Expiry Date</p>
                        <p className="text-white font-semibold mt-1">{product.expiry_date}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Recent Verifications Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl h-full">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <History className="text-teal-400" size={24} />
                Recent Verifications
              </h3>

              {recentVerifications.length > 0 ? (
                <div className="space-y-4">
                  {recentVerifications.map((verification, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white/10 border border-cyan-400/30 rounded-xl p-4 hover:bg-white/15 transition-all duration-300 hover:border-cyan-400/60"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle className="text-emerald-400 flex-shrink-0 mt-1" size={18} />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm truncate">{verification.name}</p>
                          <p className="text-cyan-200 text-xs mt-1">{verification.timestamp}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <History className="text-cyan-300/50 mb-3" size={40} />
                  <p className="text-cyan-200 text-sm">No verifications yet</p>
                  <p className="text-cyan-300/60 text-xs mt-1">Start by verifying a product</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
