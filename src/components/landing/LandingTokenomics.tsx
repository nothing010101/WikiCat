"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const dist = [
  { label: "Founder Pass Mint", pct: 50, color: "bg-purple-500", emoji: "🎟️", note: "Minted progressively — 1M per slot" },
  { label: "Liquidity Pool", pct: 49, color: "bg-yellow-400", emoji: "💧", note: "Already on-chain from day one" },
  { label: "Treasury", pct: 0.8, color: "bg-sky-500", emoji: "🏦", note: "Locked 24 months" },
  { label: "Team", pct: 0.2, color: "bg-pink-500", emoji: "🛠️", note: "Locked 12 months" },
];

export function LandingTokenomics() {
  return (
    <section id="tokenomics" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-black text-purple-700 mb-4">TOKENOMICS 🪙</h2>
          <p className="text-gray-500 text-lg">
            Max Supply: <span className="font-black text-purple-700">10,000,000,000 $WIKI</span>
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-purple-50 border border-purple-200 rounded-2xl p-5 mb-10 text-sm text-gray-600 leading-relaxed text-center max-w-2xl mx-auto">
          5,000,000,000 $WIKI already exists on-chain (LP, Treasury, Team).<br />
          The remaining 5,000,000,000 is minted slot-by-slot through the Founder Pass.<br />
          <span className="text-purple-700 font-bold">If the mint period ends before all slots are filled, unfilled tokens are never minted and ETH is automatically refunded.</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
          <div className="space-y-5">
            {dist.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-bold text-gray-700 text-sm">{item.emoji} {item.label}</span>
                  <span className="font-black text-gray-800">{item.pct}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-4">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.pct}%` }}
                    viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                    className={`h-4 rounded-full ${item.color}`} />
                </div>
                <p className="text-xs text-gray-400 mt-1">🔸 {item.note}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-8 text-white shadow-xl">
            <div className="space-y-5">
              {[
                { icon: "🎟️", label: "Per Founder Pass", value: "1,000,000 $WIKI + 1 NFT" },
                { icon: "💰", label: "Mint Price", value: "0.0011 ETH" },
                { icon: "🏷️", label: "Total Slots", value: "5,000 Only" },
                { icon: "👛", label: "Max per Wallet", value: "30 Slots" },
                { icon: "⛓️", label: "Network", value: "Base Mainnet" },
              ].map((row, i) => (
                <div key={i} className={`flex items-center gap-3 ${i < 4 ? "border-b border-white/20 pb-5" : ""}`}>
                  <span className="text-3xl">{row.icon}</span>
                  <div>
                    <div className="text-white/70 text-xs">{row.label}</div>
                    <div className="font-black text-lg">{row.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-col items-center gap-8">
          <Image
            src="/images/cat-space.png"
            alt="Wikicat in space with coins"
            width={320}
            height={320}
            className="w-48 md:w-64 drop-shadow-2xl rounded-3xl"
          />
          <a href="/mint" className="inline-block px-10 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-lg rounded-full shadow-lg hover:scale-105 transition-all">
            🐱 Mint Your Pass →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
