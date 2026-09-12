"use client";

import React from "react";
import { Compass, Orbit, Gauge, Layers, ShieldCheck, ChevronRight, Download, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onOpenWhitepaper: () => void;
  onScrollToSimulator: () => void;
}

export default function HeroSection({
  onOpenWhitepaper,
  onScrollToSimulator,
}: HeroSectionProps) {
  return (
    <section id="hero" className="relative pt-12 pb-20 overflow-hidden">
      {/* Background Decorative Radar Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tagline */}
        <div className="flex justify-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>NASA HIGH SCHOOLS UNITED WITH NASA TO CREATE HARDWARE (HUNCH)</span>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="text-center mt-6 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            NASA HUNCH: Microgravity &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Antigravity Research Initiative
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Engineering scalable centrifugal artificial gravity habitats, tethered microgravity 
            experiment payloads, and physiological countermeasure systems designed to protect 
            crews on multi-year interplanetary voyages to Mars and deep space.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onScrollToSimulator}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-space-950 font-semibold text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <span>Launch Physics Simulator</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenWhitepaper}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-space-900/90 hover:bg-space-800 text-slate-200 border border-cyan-500/30 hover:border-cyan-400 text-sm font-medium tracking-wide transition-all"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Technical Whitepaper &amp; CAD</span>
            </button>
          </div>
        </div>

        {/* Key Project Stats Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="hud-panel p-4 sm:p-5 rounded-xl text-center">
            <div className="flex justify-center text-cyan-400 mb-2">
              <Gauge className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">0.01g – 1.50g</div>
            <div className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-wider">
              Simulated G-Force
            </div>
          </div>

          <div className="hud-panel p-4 sm:p-5 rounded-xl text-center">
            <div className="flex justify-center text-cyan-400 mb-2">
              <Compass className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">10m – 100m</div>
            <div className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-wider">
              Centrifuge Radius Range
            </div>
          </div>

          <div className="hud-panel p-4 sm:p-5 rounded-xl text-center">
            <div className="flex justify-center text-cyan-400 mb-2">
              <Orbit className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">142,800+</div>
            <div className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-wider">
              Physics Iterations
            </div>
          </div>

          <div className="hud-panel p-4 sm:p-5 rounded-xl text-center">
            <div className="flex justify-center text-emerald-400 mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-300">ISS EXPRESS</div>
            <div className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-wider">
              Hardware Compatibility
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
