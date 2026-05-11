"use client";

import { motion } from "framer-motion";
import { Wallet, CreditCard, Coins, Trophy } from "lucide-react";

const STEPS = [
  {
    icon: Wallet,
    title: "Connect Your Wallet",
    description:
      "Connect with MetaMask, Coinbase Wallet, or any WalletConnect-compatible wallet on Base network.",
    color: "#FFD700",
  },
  {
    icon: CreditCard,
    title: "Choose Your Slots",
    description:
      "Select 1–30 slots. Each slot costs 0.0011 ETH. You can mint up to 30 slots per wallet address.",
    color: "#00FF87",
  },
  {
    icon: Coins,
    title: "Confirm & Mint",
    description:
      "Confirm the transaction in your wallet. The smart contract sends your NFT and $WIKI tokens instantly.",
    color: "#7C3AED",
  },
  {
    icon: Trophy,
    title: "Become a Founder",
    description:
      "Receive 1 Founder NFT + 1,000,000 $WIKI per slot. You are now part of the Wikicat founding community.",
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
            Four simple steps to secure your Founder Pass and $WIKI tokens.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Connector line */}
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

        {/* FAQ / notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 wiki-card p-6 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              q: "Which network?",
              a: "Base mainnet (Chain ID 8453). Make sure your wallet is on Base before minting.",
            },
            {
              q: "When do I get tokens?",
              a: "Instantly. Your NFT and $WIKI tokens are sent atomically in the same transaction.",
            },
            {
              q: "Can I transfer my NFT?",
              a: "Yes. The Founder NFT is a standard ERC721 and can be transferred or listed on NFT marketplaces.",
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
