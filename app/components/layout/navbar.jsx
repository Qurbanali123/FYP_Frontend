"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/About" },
    { name: "Services", href: "/Services" },
    { name: "Partners", href: "#portfolio" },
    { name: "Contact Us", href: "#contact" },
   
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 py-2 lg:py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-8 h-8 lg:w-10 lg:h-10 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/newlogo.png"
                alt="Horizon Tech"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col relative">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-gray-100 to-white font-bold text-base lg:text-lg tracking-wider leading-none">
                Fake
              </span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-red-400 to-red-600 font-semibold text-xs lg:text-sm tracking-[0.3em] leading-none">
                Product
              </span>
              <div className="absolute -right-2 top-0 w-2 h-2 bg-red-500 rounded-full animate-pulse opacity-60"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/90 hover:text-white font-medium text-sm tracking-wide relative group px-3 py-2 rounded-md transition-all duration-300 hover:bg-white/10"
              >
                {item.name}
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-red-500 to-red-600 transition-all duration-300 group-hover:w-3/4 rounded-full"></span>
              </Link>
            ))}

            {/* 🔹 Register & Login Buttons */}
            <div className="flex items-center space-x-3 ml-4 bg-blue-500">
              <Link
                href="/register"
                className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-md"
              >
                Register
              </Link>

              <Link
                href="/login"
                className="border border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-md"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                isMobileMenuOpen ? "rotate-45" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 bg-black/95 backdrop-blur-md rounded-lg mt-2 border border-white/10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium text-sm rounded-md mx-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* 🔹 Mobile Register/Login Buttons */}
            <div className="flex flex-col px-4 pt-3 space-y-2">
              <Link
                href="/register"
                className="block text-center bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
              <Link
                href="/login"
                className="block text-center border border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
