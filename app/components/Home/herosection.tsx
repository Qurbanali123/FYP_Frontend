"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ✅ Local background images
const backgroundImages = [
  "/images/HeroSection2.jpeg",
  "/images/Herosection1.jpeg", // note lowercase h
  "/images/HeroSection3.jpeg",
];

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const backgroundImage = backgroundImages[currentBgIndex];

  // ✅ Show text animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Rotate images every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    "Cybersecurity Excellence",
    "Innovative Technology Solutions",
    "Expert IT Consulting",
    "24/7 Security Monitoring",
  ];

  return (
    <section
      role="region"
      aria-label="Hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ✅ Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(20,184,166,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.1)_0%,transparent_50%)]"></div>

        {/* ✅ Main Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 animate-slow-zoom"
            style={{ willChange: "transform, opacity" }}
          >
            <Image
              src={backgroundImage}
              alt="Cybersecurity Background"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              quality={90}
              onLoad={() => setImageLoaded(true)}
              onError={() =>
                setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length)
              }
            />
          </div>
        </div>
      </div>

      {/* ✅ Hero Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-16 text-center">
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            Ensuring{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-cyan-400 animate-pulse">
              Security
            </span>
            <br />
            Inspiring{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
              Innovation
            </span>
            <br />
            <span className="text-teal-400">Driving Trust</span>
          </h1>
        </div>

        {/* ✅ Subtitle */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl mx-auto font-light">
            Leading the way in cybersecurity and technology solutions since
            2005! Transforming businesses through cutting-edge security and
            innovative IT services.
          </p>
        </div>

        {/* ✅ Features */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-2 mb-6 transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-md p-3 border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <p className="text-white/90 font-medium text-xs leading-tight">
                {feature}
              </p>
            </div>
          ))}
        </div>

        {/* ✅ CTA Button */}
        <div
          className={`transition-all duration-1000 delay-900 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <Link
            href="/services"
            className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg font-medium text-sm transition-transform hover:scale-105 shadow-md"
          >
            Get In Touch
          </Link>
        </div>
      </div>

      {/* ✅ Scroll Indicator */}
      <div
        className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1100 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        <div className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-0.5 h-2 bg-white/60 rounded-full mt-1.5 animate-bounce"></div>
        </div>
        <p className="text-white/60 text-xs mt-1 text-center">Scroll</p>
      </div>

      {/* ✅ CSS Animations */}
      <style jsx>{`
        @keyframes slow-zoom {
          0% {
            transform: scale(1.1) translate(0, 0);
          }
          50% {
            transform: scale(1.15) translate(-1%, 2%);
          }
          100% {
            transform: scale(1.1) translate(0, 0);
          }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
