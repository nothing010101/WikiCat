"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, RefreshCw } from "lucide-react";

// Fixed end timestamp — refresh does NOT reset this
const MINT_END = 1779235200000;

function getTimeLeft() {
  const now = Date.now();
  const diff = MINT_END - now;
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
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-wiki-card border border-wiki-border rounded-2xl p-6 md:p-8 relative overflow-hidden"
        >
          {/* Glow bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-wiki-yellow/5 via-transparent to-wiki-purple/5 pointer-events-none" />

          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Clock size={16} className="text-wiki-yellow" />
              <span className="text-wiki-yellow text-xs uppercase tracking-widest font-semibold">
                {time.ended ? "Mint Window Closed" : "Mint Window Closes In"}
              </span>
            </div>

            {time.ended ? (
              <div className="text-center py-4">
                <p className="text-white font-black text-2xl mb-2">Mint has ended</p>
                <p className="text-gray-400 text-sm">
                  If total supply was not reached, NFT holders are eligible for a refund of 0.0011 ETH per slot.
                </p>
              </div>
            ) : (
              <div className="flex justify-center gap-3 md:gap-6 mb-6">
                {[
                  { label: "Days", value: time.days },
                  { label: "Hours", value: time.hours },
                  { label: "Mins", value: time.minutes },
                  { label: "Secs", value: time.seconds },
                ].map(({ label, value }, i) => (
                  <div key={label} className="flex items-center gap-3 md:gap-6">
                    <div className="text-center">
                      <div className="bg-wiki-dark border border-wiki-border rounded-xl px-3 md:px-5 py-3 md:py-4 min-w-[60px] md:min-w-[80px]">
                        <span className="text-3xl md:text-5xl font-black text-white tabular-nums">
                          <Pad n={value} />
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">{label}</p>
                    </div>
                    {i < 3 && (
                      <span className="text-wiki-yellow font-black text-2xl md:text-3xl mb-4 select-none">:</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-wiki-border pt-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
              <div className="flex items-center gap-2 bg-wiki-yellow/10 border border-wiki-yellow/20 rounded-full px-4 py-2">
                <RefreshCw size={12} className="text-wiki-yellow" />
                <span className="text-wiki-yellow text-xs font-semibold">
                  Auto-refund if 5,000 slots not filled
                </span>
              </div>
              <span className="text-gray-600 text-xs">
                0.0011 ETH returned per NFT held
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
