"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const dist = [
  { label: "Founder Pass Mint", pct: 50, color: "bg-wiki-yellow", note: "Minted progressively — 1M per slot" },
  { label: "Liquidity Pool", pct: 49, color: "bg-wiki-orange", note: "Already on-chain from day one" },
  { label: "Treasury", pct: 0.8, color: "bg-wiki-purple", note: "Locked 24 months" },
  { label: "Team", pct: 0.2, color: "bg-wiki-green", note: "Locked 12 months" },
];

export function LandingTokenomics() {
  return (
    <section id="tokenomics" className="py-24 bg-wiki-dark border-t border-wiki-border">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="gradient-text">TOKENOMICS</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Max Supply: <span className="font-black text-wiki-yellow">10,000,000,000 $WIKI</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-wiki-card border border-wiki-border rounded-2xl p-5 mb-10 text-sm text-gray-500 leading-relaxed text-center max-w-2xl mx-auto"
        >
          5,000,000,000 $WIKI already exists on-chain (LP, Treasury, Team).<br />
          The remaining 5,000,000,000 is minted slot-by-slot through the Founder Pass.<br />
          <span className="text-wiki-yellow font-bold">If the mint period ends before all slots are filled, unfilled tokens are never minted and ETH is automatically refunded.</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div className="space-y-5">
            {dist.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-bold text-gray-300 text-sm">{item.label}</span>
                  <span className="font-black text-white">{item.pct}%</span>
                </div>
                <div className="w-full bg-wiki-border rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                    className={`h-3 rounded-full ${item.color}`}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">{item.note}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-wiki-card border border-wiki-border rounded-2xl p-8"
          >
            <div className="space-y-5">
              {[
                { label: "Per Founder Pass", value: "1,000,000 $WIKI + 1 NFT" },
                { label: "Mint Price", value: "0.0011 ETH" },
                { label: "Total Slots", value: "5,000 Only" },
                { label: "Max per Wallet", value: "30 Slots" },
                { label: "Network", value: "Base Mainnet" },
              ].map((row, i) => (
                <div key={i} className={`flex items-center justify-between ${i < 4 ? "border-b border-wiki-border pb-5" : ""}`}>
                  <span className="text-gray-500 text-sm">{row.label}</span>
                  <span className="font-black text-white text-sm">{row.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-wiki-yellow/10 rounded-full blur-2xl" />
            <Image
              src="/images/cat-space.png"
              alt="Wikicat in space"
              width={280}
              height={280}
              className="relative z-10 w-44 md:w-56 drop-shadow-2xl rounded-3xl"
            />
          </div>
          <a href="/mint"
            className="px-10 py-4 rounded-xl font-black text-lg bg-gradient-to-r from-wiki-yellow to-wiki-orange text-black hover:opacity-90 transition-all glow-yellow">
            🐱 Mint Your Pass
          </a>
        </motion.div>
      </div>
    </section>
  );
}
