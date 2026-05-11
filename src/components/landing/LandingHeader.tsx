"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: "#about", label: "What is Wiki" },
    { href: "#features", label: "Features" },
    { href: "#tokenomics", label: "Tokenomics" },
    { href: "#faq", label: "FAQ" },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-700 to-purple-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo
          === IMAGE PLACEHOLDER ===
          File: /public/images/logo.png  (transparent PNG ~300x100px)
          Replace the div below with: <img src="/images/logo.png" alt="Wikicat" className="h-10 w-auto" />
        */}
        <a href="/" className="flex items-center gap-2">
          <div className="h-10 w-32 bg-white/20 border-2 border-dashed border-white/50 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold leading-tight text-center">LOGO HERE</span>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-white/90 hover:text-white font-semibold text-sm transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="/mint" className="hidden md:inline-flex px-5 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm rounded-full transition-colors shadow-md">
            🐱 Mint Now
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-purple-800 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-white font-semibold">
              {link.label}
            </a>
          ))}
          <a href="/mint" className="inline-flex justify-center px-5 py-2 bg-yellow-400 text-black font-black rounded-full">
            🐱 Mint Now
          </a>
        </motion.div>
      )}
    </header>
  );
}