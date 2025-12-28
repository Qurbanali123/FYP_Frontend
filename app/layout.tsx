import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000/"), // ← Replace with your actual domain or localhost for now
  title: "FYP Blockchain",
  description:
    "This website is using for product verifiation for customer using blockchain that stored in blockchain.",
  icons: {
    icon: "/images/newlogo.png",
    shortcut: "/images/newlogo.png",
    apple: "/images/newlogo.png",
  },
  openGraph: {
    title: "Horizon Tech - Leading Cybersecurity Solutions",
    description:
      "Professional cybersecurity and technology solutions since 2005.",
    images: ["/images/newlogo.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical images to help Largest Contentful Paint on Vercel/mobile */}
  <link rel="preload" as="image" href="/images/newlogo.png" />
  <link rel="preload" as="image" href="/images/HeroSection2.jpeg" />
        <link rel="icon" href="/images/newlogo.png" type="image/png" />
        <link rel="shortcut icon" href="/images/newlogo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/newlogo.png" />

        {/* Tiny critical styles so CTA and hero fallback render correctly before full CSS loads */}
        <style>{`html{background:#020617}
          .hero-fallback{background:linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#450a0a 100%)}
          .cta-primary{background:linear-gradient(90deg,#ef4444,#dc2626);color:#fff}
          .cta-primary:focus{outline:none;box-shadow:0 0 0 4px rgba(239,68,68,0.18)}
        `}</style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
