"use client";

import { ConnectButton } from "@/components/ConnectButton";
import { motion } from "framer-motion";
import Image from "next/image";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-wiki-border bg-wiki-dark/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <a href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/logo.png"
              alt="Wikicat"
              width={36}
              height={36}
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="font-black text-white text-lg tracking-tight">Wikicat</span>
            <span className="text-wiki-yellow font-bold ml-1 text-sm">$WIKI</span>
          </a>
        </motion.div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          <a href="/" className="hover:text-wiki-yellow transition-colors">Home</a>
          <a href="#mint" className="hover:text-wiki-yellow transition-colors">Mint</a>
          <a href="#how-it-works" className="hover:text-wiki-yellow transition-colors">How It Works</a>
          <a href="#dashboard" className="hover:text-wiki-yellow transition-colors">Dashboard</a>
          <a href="/docs" className="hover:text-wiki-yellow transition-colors font-medium">Docs</a>
        </nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ConnectButton chainStatus="icon" showBalance={false} accountStatus="avatar" />
        </motion.div>
      </div>
    </header>
  );
}