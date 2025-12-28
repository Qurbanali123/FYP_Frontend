"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mail, Clock, Facebook, Instagram, Twitter, Linkedin, Shield, Users, Network, Settings } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Blockchain Consultancy', href: '#services', icon: Users },
    { name: 'Product Verification', href: '#services', icon: Network },
    { name: 'Smart Contracts', href: '#services', icon: Settings },
    { name: 'Supply Chain Tracking', href: '#services', icon: Shield },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/About' },
    { name: 'Services', href: '/Services' },
    { name: 'Contact', href: '#contact' },
    { name: 'Terms & Conditions', href: '/TermsAndConditions' },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-t from-[#000a1f] via-[#001f3f] to-[#003d66] text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001948]/10 via-transparent to-[#00b8ff]/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(0,184,255,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.1)_0%,transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <Image
                  src="/images/newlogo.png"
                  alt="Logo"
                  width={50}
                  height={50}
                  className="object-contain drop-shadow-md"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent font-extrabold">Fake</span>
                  <span className="ml-0.5 text-white">Product</span>
                </h1>
                <p className="text-xs font-medium -mt-1 text-cyan-400 tracking-wide uppercase opacity-90">🛡️ Detection</p>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Leading blockchain solutions provider in Pakistan. We protect your products and verify authenticity with advanced technology and expert services.
            </p>

            {/* Social Media */}
            <div className="flex space-x-3">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 bg-teal-700 hover:bg-teal-600 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-300">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-teal-300 text-sm transition-all duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-300">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="flex items-center space-x-2 text-gray-300 hover:text-teal-300 text-sm transition-all duration-200 group"
                    >
                      <IconComponent className="w-3 h-3 group-hover:text-teal-300" />
                      <span className="group-hover:translate-x-1 transform transition-transform duration-200">{service.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-300">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-teal-300 mt-0.5 shrink-0" />
                <p className="text-gray-300 text-sm leading-relaxed">
                  Ghakuch Ghizer Silpi Road<br />
                  Gilgit Baltistan
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-teal-300 shrink-0" />
                <a href="mailto:fpd@.com.pk" className="text-gray-300 hover:text-teal-300 text-sm transition-colors duration-200">fpd@.com.pk</a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-teal-300 shrink-0" />
                <p className="text-gray-300 text-sm">Mon–Fri: 08:00–18:00</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-teal-700/50 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Fake Product Detection. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-teal-300 transition-colors duration-200">Privacy Policy</Link>
              <Link href="/TermsAndConditions" className="text-gray-400 hover:text-teal-300 transition-colors duration-200">Terms & Conditions</Link>
              <div className="flex items-center space-x-1 text-gray-400">
                <Shield className="w-3 h-3 text-teal-300" />
                <span className="text-xs">Secured by Fake Product Detection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
