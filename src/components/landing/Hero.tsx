"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden bg-wiki-dark flex items-center">
      {/* Grid background already on parent, add subtle glow blobs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-wiki-yellow/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-wiki-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-10 relative z-10 py-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-wiki-yellow/10 border border-wiki-yellow/20 rounded-full px-5 py-2 mb-8"
          >
            <div className="w-2 h-2 bg-wiki-green rounded-full animate-pulse" />
            <span className="text-wiki-yellow text-sm font-semibold">Now Live on Base Chain</span>
          </motion.div>

          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black leading-none mb-2 text-white">
            WIKI
          </h1>
          <h2 className="text-5xl md:text-6xl font-black mb-6 gradient-text">
            CAT
          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-md mb-2 leading-relaxed">
            The internet's cat has its own token.
          </p>
          <p className="text-gray-400 text-base max-w-md mb-8 leading-relaxed">
            Mint your Founder Pass on Base Chain and get{" "}
            <span className="text-wiki-yellow font-bold">1 NFT + 1,000,000 $WIKI</span> tokens.
            Only <span className="text-white font-bold">5,000 slots</span> available.
          </p>

          <div className="flex items-center gap-3 justify-center lg:justify-start mb-8">
            <a href="#" target="_blank" rel="noopener noreferrer"
              className="w-11 h-11 bg-wiki-card border border-wiki-border rounded-full flex items-center justify-center hover:border-wiki-yellow/40 hover:scale-110 transition-all" title="Telegram">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-wiki-yellow">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer"
              className="w-11 h-11 bg-wiki-card border border-wiki-border rounded-full flex items-center justify-center hover:border-wiki-yellow/40 hover:scale-110 transition-all" title="Twitter/X">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer"
              className="w-11 h-11 bg-wiki-card border border-wiki-border rounded-full flex items-center justify-center hover:border-wiki-yellow/40 hover:scale-110 transition-all" title="TikTok">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.56a8.16 8.16 0 004.77 1.52V7.63a4.85 4.85 0 01-1-.94z"/>
              </svg>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="/mint"
              className="px-10 py-4 rounded-xl font-black text-xl bg-gradient-to-r from-wiki-yellow to-wiki-orange text-black hover:opacity-90 transition-all glow-yellow text-center">
              🐱 MINT NOW
            </a>
            <a href="#about"
              className="px-10 py-4 rounded-xl font-bold text-lg border border-wiki-border text-gray-300 hover:border-wiki-yellow/40 hover:text-wiki-yellow transition-all text-center">
              Learn More
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 flex justify-center items-center relative"
        >
          <div className="absolute inset-0 bg-wiki-yellow/5 rounded-full blur-3xl" />
          <Image
            src="/images/cat-hero.png"
            alt="Wikicat mascot"
            width={500}
            height={500}
            className="relative z-10 w-72 md:w-96 lg:w-[480px] drop-shadow-2xl animate-float"
            priority
          />
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-wiki-dark to-transparent" />
    </section>
  );
}
