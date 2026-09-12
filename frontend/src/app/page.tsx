"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SimulationDashboard from "@/components/SimulationDashboard";
import ResearchSection from "@/components/ResearchSection";
import WhitepaperModal from "@/components/WhitepaperModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState<boolean>(false);

  const handleScrollToSimulator = () => {
    const el = document.getElementById("simulator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-space-950 text-slate-100 scanlines selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar onOpenWhitepaper={() => setIsWhitepaperOpen(true)} />

      <HeroSection
        onOpenWhitepaper={() => setIsWhitepaperOpen(true)}
        onScrollToSimulator={handleScrollToSimulator}
      />

      <SimulationDashboard />

      <ResearchSection onOpenWhitepaper={() => setIsWhitepaperOpen(true)} />

      <Footer />

      <WhitepaperModal
        isOpen={isWhitepaperOpen}
        onClose={() => setIsWhitepaperOpen(false)}
      />
    </main>
  );
}
