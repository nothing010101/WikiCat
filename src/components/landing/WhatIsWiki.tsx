"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export function WhatIsWiki() {
  return (
    <section id="about" className="py-24 bg-wiki-dark border-t border-wiki-border">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center relative"
          >
            <div className="absolute inset-0 bg-wiki-yellow/5 rounded-full blur-3xl" />
            <Image
              src="/images/cat-about.png"
              alt="Wikicat mascot"
              width={380}
              height={380}
              className="relative z-10 w-60 md:w-72 lg:w-80 drop-shadow-2xl"
            />
          </motion.div>

          <div className="flex-1 text-center lg:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-white mb-6"
            >
              WHAT IS <span className="gradient-text">WIKI CAT?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg leading-relaxed mb-4"
            >
              Wikicat ($WIKI) is a meme token on Base Chain built around the internet&apos;s oldest obsession — cats.
              100 billion $WIKI launched directly to liquidity via{" "}
              <span className="text-wiki-yellow font-bold">bankr.bot</span> — no team cut, no presale, 100% community-owned.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-gray-400 text-lg leading-relaxed mb-10"
            >
              Hold <span className="text-wiki-yellow font-bold">$WIKI</span> and earn exclusive{" "}
              <span className="text-white font-bold">Wikicat NFTs</span> as rewards.
              Holders will be airdropped NFTs and will also be able to buy them directly via the website.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <a href="https://x.com/wikibasedcat" target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-wiki-yellow to-wiki-orange text-black font-bold transition-all hover:opacity-90 glow-yellow">
                🐱 Follow Us
              </a>
              <a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl border border-wiki-border text-gray-300 hover:border-wiki-yellow/40 hover:text-wiki-yellow font-bold transition-all">
                Dexscreener
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
