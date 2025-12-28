"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LoginRoleSelect() {
  const router = useRouter();

  const handleSelect = (role: string) => {
    router.push(`/login/${role}`);
  };
  
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        background: "linear-gradient(135deg, #000a1f 0%, #001f3f 50%, #003d66 100%)",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-10 text-center text-[#00b8ff] drop-shadow-lg"
      >
        Select Your Role to Login
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        {/* Customer Card */}
        

        {/* Seller Card */}
        <motion.div
          onClick={() => handleSelect("seller")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer bg-gradient-to-br from-[#004080] via-[#00b8ff] to-[#14b8a6] text-white rounded-xl shadow-2xl p-8 text-center transition-all hover:shadow-3xl"
        >
          <h2 className="text-2xl font-bold mb-3">🏪 Seller / Manufacturer</h2>
          <p className="text-gray-100">
            Login to manage your product listings and track sales.
          </p>
        </motion.div>

        {/* Admin Card */}
        <motion.div
          onClick={() => handleSelect("admin")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer bg-gradient-to-br from-[#004080] via-[#00b8ff] to-[#14b8a6] text-white rounded-xl shadow-2xl p-8 text-center transition-all hover:shadow-3xl"
        >
          <h2 className="text-2xl font-bold mb-3">🔐 Admin</h2>
          <p className="text-gray-100">
            Login to manage sellers, admins, and system operations.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
