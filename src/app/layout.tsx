import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/providers/Web3Provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Wikicat ($WIKI) — The Meme Token of Base Chain",
  description:
    "Wikicat ($WIKI) — 10 Billion supply. 5,000 Founder slots. 0.0011 ETH each. Get your NFT + 1M $WIKI. Built on Base.",
  keywords: ["Wikicat", "WIKI", "Base Chain", "meme token", "NFT", "ERC20"],
  openGraph: {
    title: "Wikicat ($WIKI) — Founder Mint is Live",
    description:
      "Mint your Founder Pass. Get 1 NFT + 1,000,000 $WIKI. Only 5,000 slots. 0.0011 ETH each.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wikicat ($WIKI)",
    description: "Mint your Founder Pass. Only 5,000 slots available.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
