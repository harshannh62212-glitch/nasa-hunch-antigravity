"use client";

import React, { useState, useEffect } from "react";
import { Rocket, Activity, Cpu, BookOpen, FileText, Wifi, WifiOff } from "lucide-react";
import { checkBackendHealth, ApiHealthStatus, API_BASE_URL } from "@/lib/api";

interface NavbarProps {
  onOpenWhitepaper: () => void;
}

export default function Navbar({ onOpenWhitepaper }: NavbarProps) {
  const [health, setHealth] = useState<ApiHealthStatus>({ online: false });
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const updateHealth = async () => {
      setChecking(true);
      const status = await checkBackendHealth();
      if (isMounted) {
        setHealth(status);
        setChecking(false);
      }
    };

    updateHealth();
    const interval = setInterval(updateHealth, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-space-950/85 border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Identity */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-400">
            <Rocket className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold tracking-wider text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-300">
                NASA HUNCH
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                PROJECT EX-AG
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block">
              MICROGRAVITY & ARTIFICIAL GRAVITY INITIATIVE
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <a
            href="#hero"
            className="px-3 py-1.5 rounded-md text-xs font-mono text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/40 transition-colors"
          >
            Mission
          </a>
          <a
            href="#simulator"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-mono text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/40 transition-colors"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Simulator</span>
          </a>
          <a
            href="#research"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-mono text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/40 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Research & CAD</span>
          </a>
          <button
            onClick={onOpenWhitepaper}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-mono text-cyan-300 hover:text-cyan-200 bg-cyan-950/50 border border-cyan-500/30 hover:border-cyan-400 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Whitepaper</span>
          </button>
        </nav>

        {/* Backend API Live Status Badge */}
        <div className="flex items-center space-x-2">
          <div
            title={`FastAPI backend (${API_BASE_URL}): ${
              health.online
                ? `Online (${health.latencyMs}ms)`
                : health.error || "Connecting..."
            }`}
            className="flex items-center space-x-2 px-2.5 py-1 rounded-full bg-space-900 border border-slate-700/80 text-[11px] font-mono shadow-inner"
          >
            {checking ? (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            ) : health.online ? (
              <>
                <Wifi className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">API LIVE</span>
                <span className="text-slate-500 hidden sm:inline">{health.latencyMs}ms</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 text-slate-400" />
                <span className="text-slate-400">STANDALONE</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
