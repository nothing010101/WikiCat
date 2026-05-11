"use client";
import Image from "next/image";

export function LandingFooter() {
  return (
    <footer className="bg-gradient-to-r from-purple-800 to-purple-700 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <a href="/" className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Wikicat" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
            <span className="text-white font-black text-xl">WIKICAT</span>
          </a>
          <div className="flex flex-wrap justify-center gap-5 text-sm">
            {[
              { href: "/mint", label: "Mint" },
              { href: "#about", label: "About" },
              { href: "#tokenomics", label: "Tokenomics" },
              { href: "#faq", label: "FAQ" },
              { href: "https://basescan.org/address/0xb19FdC19DB6F3eE33C83CBaa01781B22C3231cef", label: "Basescan", ext: true },
            ].map((link) => (
              <a key={link.label} href={link.href} target={link.ext ? "_blank" : undefined} rel={link.ext ? "noopener noreferrer" : undefined}
                className="text-white/80 hover:text-white transition-colors font-semibold">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex gap-3">
            <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors" title="Telegram">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors" title="Twitter/X">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/20 text-center space-y-1">
          <p className="text-white/50 text-xs">Token Contract (Base Mainnet)</p>
          <a href="https://basescan.org/address/0xb19FdC19DB6F3eE33C83CBaa01781B22C3231cef" target="_blank" rel="noopener noreferrer"
            className="text-white/70 hover:text-white text-xs font-mono transition-colors">
            0xb19FdC19DB6F3eE33C83CBaa01781B22C3231cef
          </a>
          <p className="text-white/30 text-xs mt-4">
            © 2025 Wikicat. All rights reserved. $WIKI is a meme token — not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
