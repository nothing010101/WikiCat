"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#features", label: "Features" },
    { href: "#tokenomics", label: "Tokenomics" },
    { href: "#faq", label: "FAQ" },
    { href: "/docs", label: "Docs" },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-wiki-border bg-wiki-dark/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo.png"
            alt="Wikicat"
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="font-black text-white text-lg tracking-tight">Wikicat</span>
          <span className="text-wiki-yellow font-bold text-sm">$WIKI</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              className="hover:text-wiki-yellow transition-colors font-medium">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="https://x.com/wikibasedcat" target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex px-5 py-2 rounded-xl font-black text-sm bg-gradient-to-r from-wiki-yellow to-wiki-orange text-black hover:opacity-90 transition-all">
            🐱 Follow Us
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-400 hover:text-white">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-wiki-card border-b border-wiki-border px-4 py-4 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-wiki-yellow font-semibold transition-colors">
              {link.label}
            </a>
          ))}
          <a href="https://x.com/wikibasedcat" target="_blank" rel="noopener noreferrer"
            className="inline-flex justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-wiki-yellow to-wiki-orange text-black font-black">
            🐱 Follow Us
          </a>
        </motion.div>
      )}
    </header>
  );
}
