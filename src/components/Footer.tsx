"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="border-t border-wiki-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-wiki-yellow to-wiki-orange flex items-center justify-center text-black font-black text-xs">
                W
              </div>
              <span className="font-black text-white">Wikicat</span>
              <span className="text-wiki-yellow text-sm">$WIKI</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              The community meme token of Base Chain. 10 Billion supply.
              5,000 Founder slots. Built on-chain, forever.
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-semibold">
              Links
            </p>
            <div className="space-y-2">
              {[
                { label: "Basescan — $WIKI", href: "#" },
                { label: "Basescan — Founder NFT", href: "#" },
                { label: "OpenSea Collection", href: "#" },
                { label: "Source Code (GitHub)", href: "#" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-500 hover:text-wiki-yellow transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-semibold">
              Token Info
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Network</span>
                <span className="text-white">Base Mainnet</span>
              </div>
              <div className="flex justify-between">
                <span>Total Supply</span>
                <span className="text-white">10,000,000,000</span>
              </div>
              <div className="flex justify-between">
                <span>Standard</span>
                <span className="text-white">ERC20 + ERC721</span>
              </div>
              <div className="flex justify-between">
                <span>Mint Price</span>
                <span className="text-wiki-yellow">0.0011 ETH / slot</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-wiki-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            © 2024 Wikicat. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            This is not financial advice. Crypto assets carry risk. Do your own
            research.
          </p>
        </div>
      </div>
    </footer>
  );
}
