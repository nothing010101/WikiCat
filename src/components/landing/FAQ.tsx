"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What is the Wikicat Founder Pass?", a: "The Founder Pass is a limited NFT that grants you 1,000,000 $WIKI tokens upon minting. Only 5,000 passes exist, making early supporters the founding community of Wikicat." },
  { q: "How do I mint?", a: "Visit the Mint page, connect your wallet (MetaMask or Coinbase Wallet), and pay 0.0011 ETH on Base network. You will receive 1 NFT and 1,000,000 $WIKI tokens instantly." },
  { q: "Who owns Wikicat?", a: "Wikicat is a community-driven project. Ownership of the smart contracts has been structured for transparency. All contracts are viewable on Basescan." },
  { q: "Is the contract audited?", a: "All contract addresses are publicly verifiable on Basescan. Token: 0xb19FdC19DB6F3eE33C83CBaa01781B22C3231cef, NFT: 0x5Ff980e0D8B1ED57427cb1f44039649F7910327b." },
  { q: "What is the use case for $WIKI?", a: "$WIKI is a community token. Holders gain early access to future Wikicat ecosystem developments, community governance, and any future utility the community decides." },
  { q: "Can I sell my Founder Pass NFT?", a: "Yes! The Founder Pass NFT is a standard ERC-721 token on Base and can be transferred or listed on any compatible NFT marketplace." },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="py-20 bg-purple-50">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black text-purple-700 mb-4">FAQ ❓</h2>
          <p className="text-gray-500 text-lg">Got questions? We got answers.</p>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-white border-2 border-purple-100 rounded-2xl overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-purple-50 transition-colors">
                <span className="font-bold text-gray-800 pr-4">{faq.q}</span>
                <ChevronDown size={20} className={`text-purple-500 flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                    <p className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-purple-100 pt-4">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}