"use client";

import { motion } from "framer-motion";
import { Coins, Gift, ShoppingCart, Store } from "lucide-react";

const STEPS = [
  {
    icon: Coins,
    title: "Get $WIKI",
    description:
      "Buy $WIKI on Base Chain via DEX. The token is launched 100% on LP via bankr.bot — fair and open to everyone.",
    color: "#FFD700",
  },
  {
    icon: Gift,
    title: "Earn NFT Rewards",
    description:
      "Hold $WIKI and qualify for exclusive Wikicat NFT airdrops. The more you hold, the more you can earn.",
    color: "#00FF87",
  },
  {
    icon: ShoppingCart,
    title: "Buy NFTs via Web",
    description:
      "Prefer to buy directly? Wikicat NFTs will also be purchasable through the website — simple and straightforward.",
    color: "#7C3AED",
  },
  {
    icon: Store,
    title: "Trade on Marketplaces",
    description:
      "All Wikicat NFTs are standard ERC-721 tokens on Base. List and trade them on any compatible NFT marketplace.",
    color: "#FF6B00",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-wiki-yellow text-xs uppercase tracking-widest font-semibold">
            Process
          </span>
          <h2 className="text-4xl font-black text-white mt-2 mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Get $WIKI, earn exclusive NFTs as rewards, or buy them directly via the website.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-wiki-yellow/20 via-wiki-green/20 to-wiki-orange/20" />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="wiki-card p-6 text-center relative"
              >
                <div className="relative inline-flex mb-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    <Icon size={28} style={{ color: step.color }} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-wiki-dark border border-wiki-border text-xs font-bold text-gray-500 flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 wiki-card p-6 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              q: "Which network?",
              a: "Base mainnet (Chain ID 8453). Make sure your wallet is on Base before trading.",
            },
            {
              q: "How do I get the NFT airdrop?",
              a: "Hold $WIKI in your wallet. NFTs will be airdropped to qualifying holders — stay tuned on Twitter/X for details.",
            },
            {
              q: "Can I sell my NFT?",
              a: "Yes. Wikicat NFTs are standard ERC-721 tokens and can be transferred or listed on any NFT marketplace.",
            },
          ].map((faq) => (
            <div key={faq.q}>
              <p className="font-bold text-wiki-yellow text-sm mb-1">
                {faq.q}
              </p>
              <p className="text-gray-500 text-sm">{faq.a}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
