"use client";
import Image from "next/image";

const NFTS = [
  { id: "01", name: "Crown King", rarity: "Legendary" },
  { id: "02", name: "Cool Cat", rarity: "Rare" },
  { id: "03", name: "Wizard", rarity: "Epic" },
  { id: "04", name: "Pirate", rarity: "Rare" },
  { id: "05", name: "Astronaut", rarity: "Legendary" },
  { id: "06", name: "Samurai", rarity: "Epic" },
  { id: "07", name: "Punk Rocker", rarity: "Rare" },
  { id: "08", name: "Cyborg", rarity: "Epic" },
  { id: "09", name: "Ninja", rarity: "Rare" },
  { id: "10", name: "Viking", rarity: "Legendary" },
];

const rarityColor: Record<string, string> = {
  Legendary: "text-wiki-yellow border-wiki-yellow/40 bg-wiki-yellow/10",
  Epic: "text-wiki-purple border-wiki-purple/40 bg-wiki-purple/10",
  Rare: "text-wiki-green border-wiki-green/40 bg-wiki-green/10",
};

export function NftScroller() {
  // Duplicate for seamless infinite scroll
  const items = [...NFTS, ...NFTS];

  return (
    <div className="py-12 border-t border-wiki-border overflow-hidden bg-wiki-dark">
      <div className="text-center mb-8 px-4">
        <span className="text-wiki-yellow text-xs uppercase tracking-widest font-semibold">
          Founder Pass Collection
        </span>
        <h3 className="text-2xl font-black text-white mt-1">
          🐱 NFT <span className="gradient-text">Identities</span>
        </h3>
        <p className="text-gray-500 text-sm mt-1">Each Founder Pass is a unique pixel cat — only 5,000 exist.</p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-wiki-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-wiki-dark to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 nft-scroll-track">
          {items.map((nft, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-40 bg-wiki-card border border-wiki-border rounded-2xl overflow-hidden hover:border-wiki-yellow/40 transition-all duration-300 group"
            >
              <div className="relative w-full aspect-square bg-wiki-dark p-2">
                <Image
                  src={"/images/nft/cat-" + nft.id + ".png"}
                  alt={"Wikicat NFT #" + nft.id}
                  fill
                  className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  sizes="160px"
                />
              </div>
              <div className="p-3">
                <p className="text-white font-bold text-xs truncate">#{nft.id} {nft.name}</p>
                <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full border font-semibold ${rarityColor[nft.rarity]}`}>
                  {nft.rarity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
