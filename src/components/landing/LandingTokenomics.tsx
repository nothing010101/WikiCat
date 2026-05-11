"use client";
import { motion } from "framer-motion";

const dist = [
  { label: "Founder Pass Mint", pct: 50, color: "bg-purple-500", emoji: "🎟️" },
  { label: "Community & Airdrops", pct: 20, color: "bg-sky-500", emoji: "🎁" },
  { label: "Liquidity Pool", pct: 20, color: "bg-yellow-400", emoji: "💧" },
  { label: "Development", pct: 10, color: "bg-pink-500", emoji: "🛠️" },
];

export function LandingTokenomics() {
  return (
    <section id="tokenomics" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black text-purple-700 mb-4">TOKENOMICS 🪙</h2>
          <p className="text-gray-500 text-lg">Total Supply: <span className="font-black text-purple-700">5,000,000,000 $WIKI</span></p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
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
                { icon: "⛓️", label: "Network", value: "Base Mainnet" },
              ].map((row, i) => (
                <div key={i} className={`flex items-center gap-3 ${i < 3 ? "border-b border-white/20 pb-5" : ""}`}>
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
          className="text-center mt-12">
          <a href="/mint" className="inline-block px-10 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-lg rounded-full shadow-lg hover:scale-105 transition-all">
            🐱 Mint Your Pass →
          </a>
        </motion.div>
      </div>
    </section>
  );
}