"use client";
import Image from "next/image";

export function LandingFooter() {
  return (
    <footer className="bg-wiki-card border-t border-wiki-border text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Wikicat"
              width={44}
              height={44}
              className="w-11 h-11 rounded-full object-cover"
            />
            <div>
              <span className="font-black text-white text-lg tracking-tight">Wikicat</span>
              <span className="text-wiki-yellow font-bold ml-1.5 text-sm">$WIKI</span>
            </div>
          </a>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { href: "/mint", label: "Mint" },
              { href: "#about", label: "About" },
              { href: "#tokenomics", label: "Tokenomics" },
              { href: "#faq", label: "FAQ" },
              { href: "https://basescan.org/address/0xb19FdC19DB6F3eE33C83CBaa01781B22C3231cef", label: "Basescan", ext: true },
            ].map((link) => (
              <a key={link.label} href={link.href}
                target={link.ext ? "_blank" : undefined}
                rel={link.ext ? "noopener noreferrer" : undefined}
                className="text-gray-400 hover:text-wiki-yellow transition-colors font-medium">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex gap-3">
            <a href="https://x.com/wikibasedcat" className="w-10 h-10 bg-wiki-dark border border-wiki-border hover:border-wiki-yellow/40 rounded-full flex items-center justify-center transition-colors" title="Twitter/X">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-400">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-wiki-border text-center space-y-1">
          <p className="text-gray-600 text-xs">Token Contract (Base Mainnet)</p>
          <a href="https://basescan.org/address/0xb19FdC19DB6F3eE33C83CBaa01781B22C3231cef"
            target="_blank" rel="noopener noreferrer"
            className="text-gray-500 hover:text-wiki-yellow text-xs font-mono transition-colors">
            0xb19FdC19DB6F3eE33C83CBaa01781B22C3231cef
          </a>
          <p className="text-gray-700 text-xs mt-4">
            © 2026 Wikicat. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
