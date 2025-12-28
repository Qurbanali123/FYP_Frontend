"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Suspense } from "react";

function AccountStatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const type = searchParams.get("type");

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 pt-20"
      style={{
        background: "linear-gradient(135deg, #001948 0%, #004080 70%, #14b8a6 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md text-center"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl text-green-500"
          >
            ✓
          </motion.div>
        </div>

        <h1 className="text-3xl font-bold text-[#00b8ff] mb-4">
          Email Verified
        </h1>

        <p className="text-gray-700 mb-6 text-lg">
          Your account creation request has been sent to our team. Once it is approved, we will notify you by email.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Email:</span>
          </p>
          <p className="text-[#00b8ff] break-all">{email}</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Status:</span> Pending Admin Approval
          </p>
        </div>

        <p className="text-gray-600 text-sm mb-6">
          {type === "admin"
            ? "An existing administrator will review your credentials and approve or reject your registration."
            : "An administrator will review your business details and approve or reject your registration."}
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="w-full bg-gradient-to-br from-[#004080] via-[#00b8ff] to-[#14b8a6] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-300"
        >
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
}

export default function AccountStatus() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <AccountStatusContent />
    </Suspense>
  );
}
