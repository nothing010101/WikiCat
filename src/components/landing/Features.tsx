"use client";
import { motion } from "framer-motion";

const features = [
  {
    title: "FAIR LAUNCH",
    description: "No pre-mine, no team allocation, no presale. Every $WIKI token is minted through the public Founder Pass — completely transparent and on-chain.",
    emoji: "🚀",
    grad: "from-pink-400 to-rose-400",
    bg: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-700",
  },
  {
    title: "LOCKED LIQUIDITY",
    description: "Liquidity is locked from day one. You can trade $WIKI freely knowing the pool is secured and the team cannot pull the rug.",
    emoji: "🔒",
    grad: "from-sky-400 to-blue-500",
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-700",
  },
  {
    title: "BASE NETWORK",
    description: "Built on Coinbase's Base chain — fast, cheap, and Ethereum-compatible. Connect with MetaMask or Coinbase Wallet and mint in seconds.",
    emoji: "⚡",
    grad: "from-yellow-400 to-amber-500",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-sky-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black text-purple-700 mb-4">WHY WIKICAT? 😺</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Built for the community, by the community.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className={`relative ${f.bg} border-2 ${f.border} rounded-3xl p-8 text-center hover:scale-105 transition-transform shadow-sm`}>
              {/*
                === IMAGE PLACEHOLDER: Cat ear decoration (optional) ===
                Files: /public/images/cat-ear-pink.png | cat-ear-blue.png | cat-ear-yellow.png  (~100x80px transparent PNG)
                Replace the badge div below with:
                <img src="/images/cat-ear-pink.png" className="absolute -top-8 left-1/2 -translate-x-1/2 h-14 w-auto" />
              */}
              <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br ${f.grad} rounded-full flex items-center justify-center text-white text-sm shadow-md`}>
                {f.emoji}
              </div>
              <div className={`w-20 h-20 bg-gradient-to-br ${f.grad} rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg`}>
                {f.emoji}
              </div>
              <h3 className={`text-xl font-black ${f.text} mb-3`}>{f.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}