"use client";
import React from 'react';
import Image from 'next/image';
import { MapPin, Mail, Clock, Facebook, Instagram } from 'lucide-react';

const ContactUs = () => {
  return (
    <section id="contact" className="py-38 relative overflow-hidden min-h-screen" style={{ background: "linear-gradient(135deg, #000a1f, #001f3f, #003d66)" }}>
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg2.png"
          alt="Background"
          fill
          className="object-cover opacity-10"
          priority
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Teal Radial Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_20%_80%,rgba(20,184,166,0.15)_0%,transparent_70%)] pb-16"></div>
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_80%_20%,rgba(6,182,212,0.15)_0%,transparent_70%)]"></div>

      <div className="container mx-auto px-4 relative z-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-center max-w-6xl mx-auto ">

          {/* Left Side - Contact Image */}
          <div className="relative order-1">
            <div className="rounded-3xl overflow-hidden relative h-[300px] md:h-[350px]">
              <Image
                src="/images/contact.jpg"
                alt="Contact Us"
                fill
                className="object-cover transition-all duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>

              {/* Overlay Text */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-white">
                  <div className="text-teal-400 font-semibold text-xs mb-1">
                    READY TO GET STARTED?
                  </div>
                  <div className="text-lg font-bold mb-1">
                    Verify Your Products Today
                  </div>
                  <div className="text-gray-200 text-xs">
                    Enterprise blockchain solutions for product authenticity verification
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative gradient circles */}
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-teal-400/30 to-cyan-400/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-2xl animate-pulse"></div>
          </div>

          {/* Right Side - Contact Information */}
          <div className="order-2 lg:order-2">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
                GET IN <span className="text-teal-400">TOUCH</span>
              </h2>
              <p className="text-gray-200 text-sm leading-relaxed drop-shadow-md">
                Use the contact form below for any questions or inquiries.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg shrink-0">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1 drop-shadow-md">ADDRESS</h3>
                  <p className="text-gray-200 text-sm leading-relaxed drop-shadow-sm">
                    Ghakuch Ghizer, Silpi Road<br />
                    Gilgit Baltistan
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1 drop-shadow-md">MAIL</h3>
                  <p className="text-gray-200 text-sm drop-shadow-sm">
                    fpd@.com.pk
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg shrink-0">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1 drop-shadow-md">WORKING HOURS</h3>
                  <p className="text-gray-200 text-sm drop-shadow-sm">
                    Mon–Fri: 08:00–18:00
                  </p>
                </div>
              </div>
            </div>

            
          </div>

        </div>
      </div>
    </section>
  )
}

export default ContactUs;
