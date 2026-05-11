"use client";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-cyan-100 flex items-center">
      {/* Cloud shapes — replace with /public/images/clouds-bg.png if available */}
      <div className="absolute top-24 left-8 w-40 h-16 bg-white rounded-full opacity-80" />
      <div className="absolute top-20 left-20 w-28 h-14 bg-white rounded-full opacity-80" />
      <div className="absolute top-28 right-12 w-48 h-16 bg-white rounded-full opacity-80" />
      <div className="absolute top-24 right-28 w-32 h-12 bg-white rounded-full opacity-80" />
      <div className="absolute top-16 left-1/3 w-44 h-14 bg-white rounded-full opacity-70" />
      <div className="absolute top-40 left-1/2 w-36 h-12 bg-white rounded-full opacity-60" />

      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-10 relative z-10 py-16">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
          className="flex-1 text-center lg:text-left">
          <div className="inline-block bg-yellow-400 text-black text-xs font-black px-4 py-1.5 rounded-full mb-5 shadow-md">
            🔥 NOW LIVE ON BASE CHAIN
          </div>
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black leading-none mb-1 drop-shadow-lg text-white" style={{WebkitTextStroke:"2px #7c3aed"}}>
            WIKI
          </h1>
          <h2 className="text-5xl md:text-6xl font-black text-yellow-400 drop-shadow mb-5" style={{WebkitTextStroke:"1px #b45309"}}>
            CAT
          </h2>
          <p className="text-lg md:text-xl text-purple-900 font-bold max-w-md mb-2">
            The internet&apos;s cat has its own token.
          </p>
          <p className="text-base text-purple-800 max-w-md mb-8 leading-relaxed">
            Mint your Founder Pass on Base Chain and get{" "}
            <strong>1 NFT + 1,000,000 $WIKI</strong> tokens.
            Only <strong>5,000 slots</strong> available!
          </p>
          <div className="flex items-center gap-3 justify-center lg:justify-start mb-8">
            <a href="#" target="_blank" rel="noopener noreferrer"
              className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform" title="Telegram">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-sky-500">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer"
              className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform" title="Twitter/X">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer"
              className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform" title="TikTok">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.56a8.16 8.16 0 004.77 1.52V7.63a4.85 4.85 0 01-1-.94z"/>
              </svg>
            </a>
          </div>
          <a href="/mint" className="inline-block px-10 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xl rounded-full shadow-lg hover:scale-105 transition-all">
            🐱 MINT NOW
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 flex justify-center items-end relative min-h-[340px]">
          {/*
            === IMAGE PLACEHOLDER: Cat Mascot ===
            File: /public/images/cat-hero.png  (500x500px transparent PNG)
            Replace the div below with:
            <img src="/images/cat-hero.png" alt="Wikicat mascot" className="w-72 md:w-96 lg:w-[420px] drop-shadow-2xl animate-float" />
          */}
          <div className="w-72 md:w-80 h-72 md:h-80 bg-white/40 border-4 border-dashed border-white/60 rounded-3xl flex flex-col items-center justify-center backdrop-blur-sm shadow-xl">
            <span className="text-6xl mb-3">🐱</span>
            <span className="text-purple-800 font-black text-sm">CAT MASCOT IMAGE</span>
            <span className="text-purple-600 text-xs mt-1">/public/images/cat-hero.png</span>
          </div>
          {/*
            === IMAGE PLACEHOLDER: Coin stacks ===
            File: /public/images/coins.png  (200x200px transparent PNG)
            Replace the div below with:
            <img src="/images/coins.png" alt="WIKI coins" className="absolute -bottom-4 -right-4 w-32 md:w-40 drop-shadow-xl" />
          */}
          <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-yellow-200/80 border-2 border-dashed border-yellow-500 rounded-2xl flex flex-col items-center justify-center">
            <span className="text-2xl">🪙</span>
            <span className="text-yellow-700 text-xs font-bold text-center leading-tight">coins.png</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full fill-white">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"/>
        </svg>
      </div>
    </section>
  );
}