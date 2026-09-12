"use client";

import React from "react";
import { Rocket, ShieldAlert, Github, ExternalLink, Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-space-950 text-slate-400 text-xs font-mono py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2 text-white">
              <Rocket className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-sm tracking-wider">
                NASA HUNCH: ANTIGRAVITY &amp; MICROGRAVITY INITIATIVE
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md font-sans">
              High Schools United with NASA to Create Hardware (HUNCH) connects high school
              students with NASA engineers to invent real flight hardware, biomedical systems, and
              simulations deployed to the International Space Station.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-cyan-400">
              <Terminal className="w-3.5 h-3.5" />
              <span>Full-Stack Architecture: Next.js (Vercel) + FastAPI Docker (Render)</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-xs">
              System Modules
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a href="#hero" className="hover:text-cyan-400 transition-colors">
                  Mission Overview
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-cyan-400 transition-colors">
                  Kinematic Physics Engine
                </a>
              </li>
              <li>
                <a href="#research" className="hover:text-cyan-400 transition-colors">
                  ISS EXPRESS Rack Specs
                </a>
              </li>
              <li>
                <a href="#research" className="hover:text-cyan-400 transition-colors">
                  CAD &amp; Hardware Testing
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-xs">
              Deployment &amp; API
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Frontend: Vercel Edge</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Backend: Render Docker</span>
              </li>
              <li>
                <span className="text-slate-500">API Endpoint: /api/calculate-gravity</span>
              </li>
              <li>
                <span className="text-slate-500">Health: /api/health</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 NASA HUNCH Showcase Project. Built for aerospace science and simulation.
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-300">NASA Flight Safety SSP-51700</span>
            <span>•</span>
            <span className="hover:text-slate-300">FastAPI + Next.js App Router</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
