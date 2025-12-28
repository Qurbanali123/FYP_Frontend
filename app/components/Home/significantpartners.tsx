"use client"
import React from 'react'
import Image from 'next/image'

const SignificantPartners = () => {
  const partners = [
    { name: 'Zara', logo: '/images/zaralogo.jpg' },
    { name: 'adidas', logo: '/images/adidaslogo.png' },
    { name: 'Breakout', logo: '/images/breakout.jpg' },
    { name: 'Outfitters', logo: '/images/outfitterlogo.png' },
    { name: 'Nike', logo: '/images/nikelogo.png' },
  ]

  // Duplicate the array to create seamless loop
  const duplicatedPartners = [...partners, ...partners]

  return (
    <section id="portfolio" className="py-16 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg2.png"
          alt="Background"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-black/35"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            OUR <span className="text-teal-400">SIGNIFICANT PARTNERS</span>
          </h2>
          <p className="text-gray-200 max-w-3xl mx-auto text-lg leading-relaxed drop-shadow-md">
           Trusted by top brands and authorities for product authenticity in Pakistan
          </p>
        </div>

        {/* Partners Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Moving Partners Strip */}
          <div className="flex animate-scroll-horizontal space-x-8 hover:pause-animation">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="shrink-0 group"
              >
                <div className="bg-white backdrop-blur-sm border border-teal-400/30 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-50 w-64 h-40 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain transition-all duration-300"
                      priority
                    />
                  </div>
                </div>
                {/* Partner Name */}
                <div className="text-center mt-4">
                  <p className="text-white font-medium text-sm drop-shadow-md group-hover:text-teal-400 transition-colors duration-300">
                    {partner.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12">
          <p className="text-gray-300 text-base drop-shadow-md">
Partnering with industry leaders to deliver world-class blockchain solutions that ensure product authenticity and protect brands from counterfeiting
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-horizontal {
          animation: scroll-horizontal 30s linear infinite;
          width: calc(200% + 2rem);
        }

        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default SignificantPartners