"use client";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-wiki-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <a href="/" className="flex items-center gap-2 mb-3">
              <Image src="/images/logo.png" alt="Wikicat" width={28} height={28} className="w-7 h-7 rounded-full object-cover" />
              <span className="font-black text-white">Wikicat</span>
              <span className="text-wiki-yellow text-sm">$WIKI</span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed">
              The internet&apos;s cat has its own token. Launching on Base Chain via ape.store.
              Hold $WIKI and earn exclusive NFT rewards.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://x.com/wikibasedcat" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-wiki-card border border-wiki-border hover:border-wiki-yellow/40 rounded-full flex items-center justify-center transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-400">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-semibold">Token Info</p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex justify-between"><span>Network</span><span className="text-white">Base Mainnet</span></div>
              <div className="flex justify-between"><span>Total Supply</span><span className="text-white">1,000,000,000</span></div>
              <div className="flex justify-between"><span>Standard</span><span className="text-white">ERC20</span></div>
              <div className="flex justify-between"><span>Launch</span><span className="text-wiki-yellow">100% LP via ape.store</span></div>
            </div>
          </div>
        </div>
        <div className="border-t border-wiki-border pt-6 flex justify-center">
          <p className="text-xs text-gray-600">© 2026 Wikicat. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
