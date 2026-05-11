"use client";

import { motion } from "framer-motion";
import { useReadContract } from "wagmi";
import {
  MINT_CONTRACT_ABI,
  CONTRACT_ADDRESSES,
} from "@/lib/contracts";
import { formatEther } from "viem";

function StatCard({
  label,
  value,
  sub,
  color = "wiki-yellow",
  delay = 0,
}: {
  label: string;
  value: string;
  sub?: string;
  color?: string;
  delay?: number;
}) {
  const colorMap: Record<string, string> = {
    "wiki-yellow": "text-wiki-yellow",
    "wiki-green": "text-wiki-green",
    "wiki-purple": "text-purple-400",
    "wiki-orange": "text-wiki-orange",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="wiki-card p-6"
    >
      <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
        {label}
      </p>
      <p
        className={`text-2xl font-black ${colorMap[color] || "text-wiki-yellow"}`}
      >
        {value}
      </p>
      {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
    </motion.div>
  );
}

export function Stats() {
  const { data: mintInfo } = useReadContract({
    address: CONTRACT_ADDRESSES.mintContract,
    abi: MINT_CONTRACT_ABI,
    functionName: "mintInfo",
  });

  const { data: ethCollected } = useReadContract({
    address: CONTRACT_ADDRESSES.mintContract,
    abi: MINT_CONTRACT_ABI,
    functionName: "totalEthCollected",
  });

  const minted = mintInfo ? Number(mintInfo[2]) : 0;
  const remaining = mintInfo ? Number(mintInfo[3]) : 5000;
  const active = mintInfo ? mintInfo[5] : false;
  const eth = ethCollected ? Number(formatEther(ethCollected)).toFixed(4) : "0";
  const progressPct = ((minted / 5000) * 100).toFixed(1);

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Slots Minted"
            value={minted.toLocaleString()}
            sub="out of 5,000 total"
            color="wiki-yellow"
            delay={0}
          />
          <StatCard
            label="Slots Remaining"
            value={remaining.toLocaleString()}
            sub="hurry up!"
            color="wiki-green"
            delay={0.1}
          />
          <StatCard
            label="ETH Collected"
            value={`${eth} ETH`}
            sub="from slot sales"
            color="wiki-purple"
            delay={0.2}
          />
          <StatCard
            label="Mint Status"
            value={active ? "LIVE" : "SOON"}
            sub={active ? "Minting is open" : "Opening soon"}
            color={active ? "wiki-green" : "wiki-orange"}
            delay={0.3}
          />
        </div>

        {/* Progress bar */}
        <div className="wiki-card p-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-400 font-medium">
              Mint Progress
            </span>
            <span className="text-wiki-yellow font-bold text-sm">
              {progressPct}% Minted
            </span>
          </div>
          <div className="h-3 bg-wiki-border rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-wiki-yellow to-wiki-orange"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>0</span>
            <span>2,500</span>
            <span>5,000</span>
          </div>
        </div>
      </div>
    </section>
  );
}
