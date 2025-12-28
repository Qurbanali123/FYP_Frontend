"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/About" },
    { name: "Services", href: "/Services" },
    { name: "Partners", href: "#portfolio" },
    { name: "Contact Us", href: "#contact" },
   
  ]

  // Show teal background on scroll OR hover
  const navBgClass = scrolled || hovered
    ? 'bg-slate-900/95 shadow-md transition-colors duration-300'
    : 'bg-transparent transition-colors duration-300'

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 ${navBgClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative h-20 flex items-center justify-between">
          {/* Left Logo */}
          <motion.div
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative drop-shadow-lg">
              <Image
                src="/images/newlogo.png"
                alt="Fake Product Detection Logo"
                width={60}
                height={60}
                className="object-contain drop-shadow-md"
              />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold tracking-tight drop-shadow-md transition-all duration-300">
                <span className="bg-linear-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent animate-pulse font-extrabold">
                  Fake
                </span>
                <span className="ml-0.5 relative">
                  Product
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-teal-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </span>
              </h1>
              <p className="text-xs font-medium -mt-1 drop-shadow-sm text-teal-300 tracking-wide uppercase opacity-90">
                🛡️ Detection
              </p>
            </div>
          </motion.div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white hover:text-teal-300 transition-colors duration-200 group"
                >
                  <span className="relative">{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-300 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 border border-white text-white font-medium rounded-full hover:bg-white hover:text-teal-700 transition-all duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-all duration-200"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              className="p-2 text-white"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  className="pt-4 border-t border-gray-200 flex flex-col gap-3"
                >
                  <Link
                    href="/login"
                    className="block text-center px-6 py-3 border border-teal-600 text-teal-700 font-semibold rounded-lg hover:bg-teal-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block text-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
