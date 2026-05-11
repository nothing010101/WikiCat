"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-wiki-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <a href="/" className="flex items-center gap-2 mb-3">
              <Image
                src="/images/logo.png"
                alt="Wikicat"
                width={28}
                height={28}
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="font-black text-white">Wikicat</span>
              <span className="text-wiki-yellow text-sm">$WIKI</span>
            </a>
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
                { label: "Basescan — $WIKI", href: "https://basescan.org/address/0xb19FdC19DB6F3eE33C83CBaa01781B22C3231cef" },
                { label: "Basescan — Founder NFT", href: "https://basescan.org/address/0x5ff980e0d8b1ed57427cb1f44039649f7910327b" },
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

        <div className="border-t border-wiki-border pt-6 flex justify-center">
          <p className="text-xs text-gray-600">
            © 2026 Wikicat. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
