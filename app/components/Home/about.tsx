"use client";

import React from 'react';
import Image from 'next/image';
import { Shield, Users, Eye, HelpCircle, Building } from 'lucide-react';

const leftItems = [
  { icon: Shield, title: 'Our Approach', text: 'Decentralized blockchain technology with immutable product records and real-time verification systems for maximum transparency.' },
  { icon: Building, title: 'Our Mission', text: 'Delivering cutting-edge blockchain solutions to prevent counterfeiting and ensure product authenticity worldwide.' },
  { icon: Users, title: 'Our Team', text: 'Blockchain experts, smart contract developers, and product verification specialists with 10+ years experience.' },
];

const rightItems = [
  { icon: Eye, title: 'Our Vision', text: 'Creating a trustworthy digital marketplace through innovative blockchain solutions and verified product ecosystems.' },
  { icon: HelpCircle, title: 'Our Expertise', text: '10+ years in blockchain development, smart contracts, product authentication, and supply chain verification.' },
  { icon: Shield, title: 'Why Choose Us?', text: 'Trusted by 500+ manufacturers globally with 99.9% verification accuracy, 24/7 support, and blockchain certifications.' },
];

const centralLink = '#shield';

interface InfoCardProps {
  icon: React.ElementType;
  title: string;
  text: string;
}

const InfoCard = ({ icon: Icon, title, text }: InfoCardProps) => (
  <a
    href={centralLink}
    className="group block bg-gradient-to-br from-[#004080]/60 via-[#00b8ff]/40 to-[#14b8a6]/40 rounded-xl p-4 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer border border-cyan-400/30"
  >
    <div className="flex items-start gap-3">
      <div className="shrink-0 group-hover:scale-110 transition-transform duration-300">
        <div className="w-12 h-12 bg-[#00b8ff] rounded-full flex items-center justify-center shadow-md">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-white font-semibold text-base mb-1 group-hover:text-[#00b8ff]">{title}</h3>
        <p className="text-gray-300 text-sm group-hover:text-gray-100">{text}</p>
      </div>
    </div>
  </a>
);

const About = () => {
  return (
    <section id="about" className="py-16 relative min-h-screen flex flex-col"
             style={{ background: 'linear-gradient(135deg, #000a1f, #001f3f, #003d66)' }}>
      {/* Background overlay */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg2.png" alt="Background" fill className="object-cover opacity-10" />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            ABOUT <span className="text-[#00b8ff]">US</span>
          </h2>
          <p className="text-gray-300 text-base">
            Trusted platform connecting customers and sellers to verify product authenticity. Using blockchain, every registered product is securely tracked, allowing customers to confirm its origin and genuineness. Over 500 manufacturers have registered their products to prevent counterfeiting. Our system ensures transparency and builds trust between brands and buyers. Simply scan or search to instantly verify any product’s authenticity.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex relative flex-1 min-h-[500px] max-h-[70vh] items-center justify-center">
          {/* Left Cards */}
          <div className="flex flex-col space-y-6 mr-20">
            {leftItems.map((item, idx) => (
              <InfoCard key={idx} {...item} />
            ))}
          </div>

          {/* Central Shield Image */}
          <div id="shield" className="relative z-20">
            <div className="w-72 h-72 relative">
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#001948]/10 via-[#004080]/10 to-[#00b8ff]/20 shadow-2xl border-4 border-[#00b8ff]/40 p-3">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-white to-[#00b8ff]/10">
                  <Image
                    src="/images/cybersecurity-shield.png"
                    alt="Blockchain Verification"
                    fill
                    className="object-cover filter drop-shadow-2xl rounded-full"
                  />
                </div>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-[#00b8ff]/30 via-[#00a0c0]/30 to-[#0080a0]/30 rounded-full blur-3xl animate-pulse"></div>
            </div>
          </div>

          {/* Right Cards */}
          <div className="flex flex-col space-y-6 ml-20">
            {rightItems.map((item, idx) => (
              <InfoCard key={idx} {...item} />
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden space-y-8">
          <div className="flex justify-center mb-8">
            <div id="shield" className="w-60 h-60 relative">
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#001948]/10 via-[#004080]/10 to-[#00b8ff]/20 shadow-2xl border-4 border-[#00b8ff]/40 p-2">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-white to-[#00b8ff]/10">
                  <Image
                    src="/images/cybersecurity-shield.png"
                    alt="Blockchain Verification"
                    fill
                    className="object-cover filter drop-shadow-2xl rounded-full"
                  />
                </div>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-[#00b8ff]/30 via-[#00a0c0]/30 to-[#0080a0]/30 rounded-full blur-2xl animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 px-4">
            {[...leftItems, ...rightItems].map((card, idx) => (
              <InfoCard key={idx} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
