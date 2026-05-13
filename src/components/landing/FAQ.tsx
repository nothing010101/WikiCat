"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What is Wikicat ($WIKI)?", a: "Wikicat is a community meme token launching on Base Chain. $WIKI is the primary token of the ecosystem, and Wikicat NFTs will be distributed as rewards to holders and community participants." },
  { q: "How do I get Wikicat NFTs?", a: "Wikicat NFTs are distributed as rewards — not through a direct purchase. Once $WIKI launches, holders and active community members will be able to earn exclusive Wikicat NFTs that can be sold on any ERC-721 compatible marketplace." },
  { q: "When is $WIKI launching?", a: "The $WIKI token launch is coming soon on Base Chain. Follow our official Twitter/X (@wikibasedcat) for the latest announcements and launch details." },
  { q: "Who owns Wikicat?", a: "Wikicat is a community-driven project. Ownership of the smart contracts has been structured for transparency. All contracts are viewable on Basescan." },
  { q: "What is the use case for $WIKI?", a: "$WIKI is the community token of the Wikicat ecosystem. Holders gain early access to NFT rewards, community governance, and any future utility the community decides together." },
  { q: "Can I sell my Wikicat NFT?", a: "Yes! Wikicat NFTs are standard ERC-721 tokens on Base and can be transferred or listed on any compatible NFT marketplace such as OpenSea." },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 bg-wiki-card border-t border-wiki-border">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="gradient-text">FAQ</span>
          </h2>
          <p className="text-gray-500 text-lg">Got questions? We got answers.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-wiki-dark border border-wiki-border rounded-xl overflow-hidden hover:border-wiki-yellow/30 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-bold text-gray-200 pr-4">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-wiki-yellow flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-6 pb-5 text-gray-500 leading-relaxed border-t border-wiki-border pt-4 text-sm">
                      {faq.a}
                    </p>
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
