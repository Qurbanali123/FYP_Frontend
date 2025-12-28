"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Shield,
  Network,
  Settings,
  Laptop,
  Fingerprint,
  HelpCircle,
  Monitor,
  GraduationCap
} from "lucide-react"

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const services = [
    { id: 1, number: "01", title: "Blockchain Consultancy", description: "We provide expert consultancy for product authentication and supply chain verification. Our blockchain specialists guide businesses through implementation with strategic planning and technical expertise.", icon: Users, image: "/images/IT-Consultancy.png" },
    { id: 2, number: "02", title: "Smart Contract Development", description: "Custom smart contract development for product verification and authentication. Ensuring your blockchain systems meet international compliance and standards for immutable record-keeping.", icon: Shield, image: "/images/conformancevalidation.jpg" },
    { id: 3, number: "03", title: "Product Registration & Verification", description: "Comprehensive product registration and real-time verification services using blockchain. Complete tracking of products from manufacturer to consumer with transparent audit trails.", icon: Network, image: "/images/network-security.png" },
    { id: 4, number: "04", title: "24/7 Blockchain Support", description: "Round-the-clock monitoring, maintenance, and support for your blockchain infrastructure. 24/7 dedicated team for product verification system maintenance and issue resolution.", icon: Settings, image: "/images/managed-services.jpg" },
    { id: 5, number: "05", title: "Blockchain Integration", description: "Seamless integration of blockchain technology into your existing business systems. Professional setup and configuration for product authentication and supply chain visibility.", icon: Laptop, image: "/images/network-installation.jpg" },
    { id: 6, number: "06", title: "Anti-Counterfeiting Solutions", description: "Advanced blockchain-based anti-counterfeiting systems that identify and prevent fake products. Real-time detection and traceability for complete supply chain security.", icon: Fingerprint, image: "/images/digital-forensics.jpg" },
    { id: 7, number: "07", title: "Audit & Compliance", description: "Complete blockchain audit and compliance verification for product authentication. Comprehensive risk assessments ensuring transparent and secure product ecosystems.", icon: HelpCircle, image: "/images/security-assessment.jpg" },
    { id: 8, number: "08", title: "Blockchain Training", description: "Custom blockchain technology training and workshops for businesses in Pakistan. Educating your team on blockchain fundamentals and product verification best practices.", icon: GraduationCap, image: "/images/security-training.jpg" },
    { id: 9, number: "09", title: "Infrastructure Setup", description: "Enterprise-level blockchain infrastructure development for product verification systems. Building robust, scalable blockchain foundations for modern product authentication.", icon: Monitor, image: "/images/it-infrastructure.jpg" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [services.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % services.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + services.length) % services.length)
  const goToSlide = (index: number) => setCurrentSlide(index)

  const currentService = services[currentSlide]
  const IconComponent = currentService.icon

  return (
    <section id="services" className="py-12 relative overflow-hidden min-h-[80vh]" style={{ background: "linear-gradient(135deg, #000a1f, #001f3f, #004d5c)" }}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg2.png" alt="Background" fill className="object-cover opacity-10" priority />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Teal Radial Glows */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_20%_80%,rgba(20,184,166,0.15)_0%,transparent_70%)]"></div>
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_80%_20%,rgba(6,182,212,0.15)_0%,transparent_70%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            OUR <span className="text-teal-400">SERVICES</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-base leading-relaxed">
            We provide the most advanced product verification services using blockchain in the country. From individual sellers to large manufacturers, our platform ensures every product’s authenticity and origin.
          </p>
        </div>

        {/* Slider */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left */}
            <div className="order-2 lg:order-1 p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white font-bold text-xl">{currentService.number}</span>
                </div>
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center shadow-lg">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                {currentService.title}
              </h3>
              <p className="text-gray-200 text-lg leading-relaxed mb-8 drop-shadow-md">
                {currentService.description}
              </p>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {services.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 shadow-lg ${
                        index === currentSlide ? "bg-teal-400 w-8" : "bg-gray-600 hover:bg-gray-500"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevSlide}
                    className="w-12 h-12 bg-gray-700/80 hover:bg-teal-500 rounded-full flex items-center justify-center transition-all duration-300 group shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5 text-white group-hover:text-white" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-12 h-12 bg-gray-700/80 hover:bg-teal-500 rounded-full flex items-center justify-center transition-all duration-300 group shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5 text-white group-hover:text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="order-1 lg:order-2 relative">
              <div className="bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-xl p-1">
                <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl overflow-hidden">
                  <div className="relative h-[300px] md:h-[350px]">
                    <Image src={currentService.image} alt={currentService.title} fill className="object-cover transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white flex justify-between items-center">
                      <div>
                        <div className="text-teal-400 font-semibold text-xs mb-1">
                          SERVICE {currentService.number}
                        </div>
                        <div className="text-lg font-bold">{currentService.title}</div>
                      </div>
                      <div className="text-teal-400 text-xs">{currentSlide + 1} / {services.length}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-teal-400/30 to-cyan-400/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Counter */}
          <div className="flex justify-center mt-8">
            <div className="bg-gray-800/80 backdrop-blur-sm border border-cyan-400/30 rounded-full px-4 py-2">
              <div className="text-white text-xs font-medium">
                <span className="text-teal-400">{String(currentSlide + 1).padStart(2, "0")}</span>
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-gray-300">{String(services.length).padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
