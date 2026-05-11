"use client";
import { motion } from "framer-motion";

export function WhatIsWiki() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex justify-center mb-8">
          <div className="h-20 w-52 bg-purple-50 border-2 border-dashed border-purple-300 rounded-xl flex flex-col items-center justify-center">
            <span className="text-purple-600 font-black text-sm">LOGO HERE</span>
            <span className="text-purple-400 text-xs">/public/images/logo.png</span>
          </div>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-purple-700 mb-6">
          WHAT IS WIKI CAT? 🐱
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-4">
          Wikicat ($WIKI) is a meme token on Base Chain built around the internet&apos;s oldest obsession — cats.
          Early supporters get in through the Founder Pass NFT mint, the only way new $WIKI enters circulation.
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
          Each Founder Pass grants you <strong className="text-purple-700">1 NFT + 1,000,000 $WIKI tokens</strong> — on-chain,
          transparent, yours forever. Only <strong className="text-purple-700">5,000 slots</strong>. First come, first served.
          The mint has a time limit — when the countdown ends, any unfilled slots are gone and ETH is refunded automatically.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4">
          <a href="/mint" className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full transition-colors shadow-md">
            🎟️ Mint Founder Pass
          </a>
          <a href="https://basescan.org/address/0xb19FdC19DB6F3eE33C83CBaa01781B22C3231cef" target="_blank" rel="noopener noreferrer"
            className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-full transition-colors shadow-md">
            🔍 Basescan
          </a>
          <a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer"
            className="px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-full transition-colors shadow-md">
            📊 Dexscreener
          </a>
        </motion.div>
      </div>
    </section>
  );
}
