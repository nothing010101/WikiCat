"use client";

import { motion } from "framer-motion";
import { TOKENOMICS, MINT_CONFIG } from "@/types";

export function Tokenomics() {
  return (
    <section id="tokenomics" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-wiki-yellow text-xs uppercase tracking-widest font-semibold">
            Distribution
          </span>
          <h2 className="text-4xl font-black text-white mt-2 mb-4">
            Token{" "}
            <span className="gradient-text">Economics</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Total supply of{" "}
            <span className="text-white font-bold">10,000,000,000 $WIKI</span>{" "}
            — distributed fairly across the ecosystem.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Visual pie representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-64 h-64">
              {/* SVG donut chart */}
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                {/* LP 49% */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#00FF87"
                  strokeWidth="3"
                  strokeDasharray="49 51"
                  strokeDashoffset="0"
                />
                {/* Founder 50% */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#FFD700"
                  strokeWidth="3"
                  strokeDasharray="50 50"
                  strokeDashoffset="-49"
                />
                {/* Treasury 0.8% */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="3"
                  strokeDasharray="0.8 99.2"
                  strokeDashoffset="-99"
                />
                {/* Team 0.2% */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#FF6B00"
                  strokeWidth="3"
                  strokeDasharray="0.2 99.8"
                  strokeDashoffset="-99.8"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-black text-white">10B</p>
                <p className="text-xs text-gray-500">Total $WIKI</p>
              </div>
            </div>
          </motion.div>

          {/* Breakdown */}
          <div className="space-y-4">
            {TOKENOMICS.map((slice, i) => (
              <motion.div
                key={slice.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="wiki-card p-5 flex items-center gap-4"
              >
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: slice.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-white text-sm">
                      {slice.label}
                    </p>
                    <span
                      className="font-black text-sm ml-4 shrink-0"
                      style={{ color: slice.color }}
                    >
                      {slice.percentage}%
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {slice.amount} WIKI
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    {slice.description}
                  </p>

                  {/* Bar */}
                  <div className="mt-2 h-1 bg-wiki-border rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: slice.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${slice.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mint info cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { label: "Total Slots", value: "5,000", color: "wiki-yellow" },
            {
              label: "$WIKI per Slot",
              value: "1,000,000",
              color: "wiki-green",
            },
            { label: "Mint Price", value: "0.0011 ETH", color: "wiki-purple" },
            {
              label: "Max per Wallet",
              value: "30 slots",
              color: "wiki-orange",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="wiki-card p-4 text-center"
            >
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                {item.label}
              </p>
              <p
                className={`font-black text-lg ${item.color === "wiki-yellow" ? "text-wiki-yellow" : item.color === "wiki-green" ? "text-wiki-green" : item.color === "wiki-purple" ? "text-purple-400" : "text-wiki-orange"}`}
              >
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
