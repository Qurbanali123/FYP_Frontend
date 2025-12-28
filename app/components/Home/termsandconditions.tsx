"use client";

import React from 'react';
import { motion } from 'framer-motion';

const TermsAndConditions = () => {
  const sections = [
    {
      title: "1. Introduction",
      content: "Welcome to Fake Product Detection Platform. These Terms and Conditions govern your access to and use of our website, services, and blockchain-based product verification system. By accessing or using our platform, you agree to be bound by these terms. If you disagree with any part of these terms, you may not use our services."
    },
    {
      title: "2. Services Overview",
      content: "Fake Product Detection Platform provides blockchain-based product authentication, verification, and anti-counterfeiting solutions. Our services include product registration, real-time verification, smart contract development, supply chain tracking, and comprehensive blockchain consultancy for businesses and manufacturers."
    },
    {
      title: "3. User Accounts",
      content: "To access certain features, you must create an account as either an Admin, Seller, or Customer. You are responsible for maintaining the confidentiality of your account credentials and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account."
    },
    {
      title: "4. User Responsibilities",
      content: "Users agree to: (a) Provide accurate and complete information; (b) Not use the platform for illegal purposes; (c) Not attempt to gain unauthorized access to our systems; (d) Not upload malicious code or content; (e) Comply with all applicable laws and regulations; (f) Not engage in any form of fraud or misrepresentation."
    },
    {
      title: "5. Product Registration & Verification",
      content: "When registering products on our blockchain platform, you warrant that: (a) You have the right to register the product; (b) All information provided is accurate and complete; (c) You own or have authorization to represent the product; (d) The product information does not infringe third-party rights; (e) You will maintain records of all registration data."
    },
    {
      title: "6. Intellectual Property Rights",
      content: "All content, logos, trademarks, and intellectual property on the Fake Product Detection Platform are owned by or licensed to us. You retain rights to content you upload, but grant us a worldwide, non-exclusive license to use, reproduce, and distribute your content to provide our services. You may not reproduce, distribute, or transmit our content without written permission."
    },
    {
      title: "7. Limitation of Liability",
      content: "To the maximum extent permitted by law, Fake Product Detection Platform and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages. We do not guarantee the accuracy, completeness, or reliability of any information on our platform. Use of our services is at your own risk."
    },
    {
      title: "8. Data Protection & Privacy",
      content: "We are committed to protecting your personal data. All data collected is processed in accordance with our Privacy Policy and applicable data protection regulations. Your data may be stored, processed, and encrypted using blockchain technology. We implement industry-standard security measures to protect your information."
    },
    {
      title: "9. Blockchain & Smart Contracts",
      content: "Our platform utilizes blockchain technology and smart contracts for product verification. Once data is recorded on the blockchain, it becomes immutable and permanent. You acknowledge that blockchain transactions are irreversible. We are not responsible for errors in blockchain records once they are finalized."
    },
    {
      title: "10. Payment Terms",
      content: "Applicable service fees will be displayed before transaction completion. Payment must be made through authorized payment methods. All fees are exclusive of applicable taxes. Refund requests must be made within 30 days of payment. We reserve the right to modify fees with 30 days' notice."
    },
    {
      title: "11. Termination of Services",
      content: "We may terminate or suspend your account if: (a) You violate these terms; (b) You engage in fraudulent activity; (c) You fail to pay applicable fees; (d) We are required to do so by law; (e) You request account deletion. Upon termination, your access to services will cease immediately."
    },
    {
      title: "12. Dispute Resolution",
      content: "Any disputes arising from these terms or use of our services shall be governed by the laws of Pakistan. Both parties agree to attempt resolution through negotiation first. If negotiation fails, disputes shall be resolved through binding arbitration or applicable court jurisdiction in Pakistan."
    },
    {
      title: "13. Modifications to Terms",
      content: "We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Your continued use of the platform constitutes acceptance of modified terms. We encourage you to review these terms regularly for updates."
    },
    {
      title: "14. Third-Party Links",
      content: "Our platform may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of external sites. Your use of third-party sites is at your own risk and subject to their terms. We recommend reviewing third-party privacy policies before sharing information."
    },
    {
      title: "15. Contact Information",
      content: "For questions about these Terms and Conditions, please contact us at: Email: support@fakeproductdetection.com | Address: Horizon Tech, Lahore, Pakistan | Phone: +92-XXX-XXXXXXX. We will respond to inquiries within 48 business hours."
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden min-h-screen" style={{ background: "linear-gradient(135deg, #000a1f, #001f3f, #003d66)" }}>
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_20%_80%,rgba(20,184,166,0.15)_0%,transparent_70%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_80%_20%,rgba(6,182,212,0.15)_0%,transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-gray-100">
            Please read these terms carefully before using our blockchain product verification platform.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-bold text-teal-300 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-100 leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          className="mt-12 p-6 bg-teal-500/20 border border-teal-400/50 rounded-xl text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-100">
            Last Updated: <span className="font-semibold text-teal-300">December 2024</span>
          </p>
          <p className="text-gray-200 mt-2 text-sm">
            By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
