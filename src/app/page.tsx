"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Stats } from "@/components/Stats";
import { MintSection } from "@/components/MintSection";
import { Tokenomics } from "@/components/Tokenomics";
import { HowItWorks } from "@/components/HowItWorks";
import { Dashboard } from "@/components/Dashboard";
import { Footer } from "@/components/Footer";
import { Zap, Shield, Globe } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-wiki-dark grid-bg">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-wiki-yellow/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-wiki-purple/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-wiki-yellow/10 border border-wiki-yellow/20 rounded-full px-5 py-2 mb-8"
          >
            <div className="w-2 h-2 bg-wiki-green rounded-full animate-pulse" />
            <span className="text-wiki-yellow text-sm font-semibold">
              Now Live on Base Chain
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-white mb-4 leading-none tracking-tight"
          >
            Wiki
            <span className="gradient-text">cat</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-wiki-yellow font-black text-3xl md:text-4xl mb-6 text-glow"
          >
            $WIKI
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            The internet&apos;s cat has its own token. Mint your Founder Pass on
            Base. Get{" "}
            <span className="text-wiki-yellow font-bold">
              1 NFT + 1,000,000 $WIKI
            </span>{" "}
            per slot. Only{" "}
            <span className="text-white font-bold">5,000 slots</span> total.
          </motion.p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {[
              { icon: Zap, text: "0.0011 ETH per slot" },
              { icon: Shield, text: "Auditable on-chain" },
              { icon: Globe, text: "Base Mainnet" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 bg-wiki-card border border-wiki-border rounded-full px-4 py-2 text-sm text-gray-300"
              >
                <Icon size={14} className="text-wiki-yellow" />
                {text}
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#mint"
              className="px-8 py-4 rounded-xl font-black text-lg bg-gradient-to-r from-wiki-yellow to-wiki-orange text-black hover:opacity-90 transition-all glow-yellow"
            >
              Mint Now
            </a>
            <a
              href="#tokenomics"
              className="px-8 py-4 rounded-xl font-bold text-lg border border-wiki-border text-gray-300 hover:border-wiki-yellow/40 hover:text-wiki-yellow transition-all"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </section>

      {/* Live stats */}
      <Stats />

      {/* Mint section */}
      <MintSection />

      {/* Tokenomics */}
      <Tokenomics />

      {/* How it works */}
      <HowItWorks />

      {/* Dashboard */}
      <Dashboard />

      <Footer />
    </main>
  );
}
