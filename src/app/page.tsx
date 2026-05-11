"use client";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Hero } from "@/components/landing/Hero";
import { WhatIsWiki } from "@/components/landing/WhatIsWiki";
import { Features } from "@/components/landing/Features";
import { LandingTokenomics } from "@/components/landing/LandingTokenomics";
import { FAQ } from "@/components/landing/FAQ";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <LandingHeader />
      <Hero />
      <WhatIsWiki />
      <Features />
      <LandingTokenomics />
      <FAQ />
      <LandingFooter />
    </main>
  );
}