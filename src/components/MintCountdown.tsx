"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Users } from "lucide-react";
import { useReadContract } from "wagmi";
import { MINT_CONTRACT_ABI, CONTRACT_ADDRESSES } from "@/lib/contracts";

function getTimeLeft(deadlineMs: number) {
  const diff = deadlineMs - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    ended: false,
  };
}

function Pad({ n }: { n: number }) {
  return <>{String(n).padStart(2, "0")}</>;
}

export function MintCountdown() {
  const { data: deadlineRaw } = useReadContract({
    address: CONTRACT_ADDRESSES.mintContract,
    abi: MINT_CONTRACT_ABI,
    functionName: "mintDeadline",
  });

  const mintDeadlineMs = deadlineRaw ? Number(deadlineRaw) * 1000 : 0;
  // Vote period = 7 days AFTER mint deadline ends
  const voteDeadlineMs = mintDeadlineMs > 0 ? mintDeadlineMs + 7 * 24 * 60 * 60 * 1000 : 0;

  const [mintTime, setMintTime] = useState({ days: 2, hours: 0, minutes: 0, seconds: 0, ended: false });
  const [voteTime, setVoteTime] = useState({ days: 7, hours: 0, minutes: 0, seconds: 0, ended: false });

  useEffect(() => {
    if (!mintDeadlineMs) return;
    const tick = () => {
      setMintTime(getTimeLeft(mintDeadlineMs));
      setVoteTime(getTimeLeft(voteDeadlineMs));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [mintDeadlineMs, voteDeadlineMs]);

  const mintEnded = mintTime.ended;

  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-4">

        {/* Mint Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-wiki-card border border-wiki-border rounded-2xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-wiki-yellow/5 via-transparent to-transparent pointer-events-none" />
          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-5">
              <Clock size={16} className="text-wiki-yellow" />
              <span className="text-wiki-yellow text-xs uppercase tracking-widest font-semibold">
                {mintEnded ? "Mint Window Closed" : "Mint Window Closes In"}
              </span>
            </div>
            {mintEnded ? (
              <p className="text-center text-gray-400 text-sm">Mint has ended. Community vote is now open.</p>
            ) : (
              <div className="flex justify-center gap-3 md:gap-6">
                {[
                  { label: "Days",  value: mintTime.days },
                  { label: "Hours", value: mintTime.hours },
                  { label: "Mins",  value: mintTime.minutes },
                  { label: "Secs",  value: mintTime.seconds },
                ].map(({ label, value }, i) => (
                  <div key={label} className="flex items-center gap-3 md:gap-6">
                    <div className="text-center">
                      <div className="bg-wiki-dark border border-wiki-border rounded-xl px-3 md:px-5 py-3 md:py-4 min-w-[60px] md:min-w-[80px]">
                        <span className="text-3xl md:text-5xl font-black text-white tabular-nums"><Pad n={value} /></span>
                      </div>
                      <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">{label}</p>
                    </div>
                    {i < 3 && <span className="text-wiki-yellow font-black text-2xl md:text-3xl mb-4 select-none">:</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Vote Countdown — 7 days after mint ends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-wiki-card border border-wiki-purple/30 rounded-2xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-wiki-purple/5 via-transparent to-transparent pointer-events-none" />
          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-5">
              <Users size={16} className="text-wiki-purple" />
              <span className="text-wiki-purple text-xs uppercase tracking-widest font-semibold">
                {voteTime.ended ? "Vote Period Closed" : "Community Vote Window"}
              </span>
            </div>
            {voteTime.ended ? (
              <p className="text-center text-gray-400 text-sm">Vote period has ended.</p>
            ) : (
              <>
                <div className="flex justify-center gap-3 md:gap-6 mb-5">
                  {[
                    { label: "Days",  value: voteTime.days },
                    { label: "Hours", value: voteTime.hours },
                    { label: "Mins",  value: voteTime.minutes },
                    { label: "Secs",  value: voteTime.seconds },
                  ].map(({ label, value }, i) => (
                    <div key={label} className="flex items-center gap-3 md:gap-6">
                      <div className="text-center">
                        <div className="bg-wiki-dark border border-wiki-purple/20 rounded-xl px-3 md:px-5 py-3 md:py-4 min-w-[60px] md:min-w-[80px]">
                          <span className="text-3xl md:text-5xl font-black text-white tabular-nums"><Pad n={value} /></span>
                        </div>
                        <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">{label}</p>
                      </div>
                      {i < 3 && <span className="text-wiki-purple font-black text-2xl md:text-3xl mb-4 select-none">:</span>}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center border-t border-wiki-border pt-4">
                  <div className="flex items-center gap-2 bg-wiki-purple/10 border border-wiki-purple/20 rounded-full px-4 py-2">
                    <span className="text-wiki-purple text-xs font-semibold">
                      If not sold out: community votes — Add LP or Refund (0.0011 ETH/slot)
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
