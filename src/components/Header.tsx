"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-wiki-border bg-wiki-dark/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-wiki-yellow to-wiki-orange flex items-center justify-center text-black font-black text-sm">
            W
          </div>
          <div>
            <span className="font-black text-white text-lg tracking-tight">
              Wikicat
            </span>
            <span className="text-wiki-yellow font-bold ml-1 text-sm">
              $WIKI
            </span>
          </div>
        </motion.div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          <a href="#mint" className="hover:text-wiki-yellow transition-colors">
            Mint
          </a>
          <a
            href="#tokenomics"
            className="hover:text-wiki-yellow transition-colors"
          >
            Tokenomics
          </a>
          <a
            href="#how-it-works"
            className="hover:text-wiki-yellow transition-colors"
          >
            How It Works
          </a>
          <a
            href="#dashboard"
            className="hover:text-wiki-yellow transition-colors"
          >
            Dashboard
          </a>
        </nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ConnectButton
            chainStatus="icon"
            showBalance={false}
            accountStatus="avatar"
          />
        </motion.div>
      </div>
    </header>
  );
}
