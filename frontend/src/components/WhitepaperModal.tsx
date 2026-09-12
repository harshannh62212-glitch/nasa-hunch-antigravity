"use client";

import React from "react";
import { X, Download, Printer, CheckCircle, FileText, Share2 } from "lucide-react";

interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhitepaperModal({ isOpen, onClose }: WhitepaperModalProps) {
  if (!isOpen) return null;

  const handleDownload = () => {
    const paperContent = `
================================================================================
NASA HUNCH RESEARCH INITIATIVE: TECHNICAL WHITEPAPER
DOC ID: NASA-HUNCH-AG-2026-004
TITLE: Scalable Centrifugal Artificial Gravity Systems for Deep Space Exploration
AUTHORS: NASA HUNCH High School Research Division & NASA JSC Mentors
DATE: September 2026
================================================================================

ABSTRACT:
Prolonged exposure to microgravity induces neurovestibular disorientation, bone mineral
density loss (-1.5% monthly in weight-bearing trabecular bone), cardiovascular deconditioning,
and spaceflight-associated neuro-ocular syndrome (SANS). 

This research project introduces an electro-mechanically balanced, counter-rotating
centrifuge module engineered for integration within an ISS EXPRESS Rack envelope (Phase 1)
and scalable to a 56m tethered habitat ring (Phase 2). 

By sustaining an effective artificial gravity field between 0.38g (Mars-equivalent) and
1.00g (Earth-standard) at rotational velocities under 4.0 RPM, Coriolis cross-coupling
angular acceleration gradients are kept within human vestibular adaptation thresholds.

1. GOVERNING KINEMATICS:
   - Centripetal Acceleration: a_c = omega^2 * r = ((2 * pi * RPM) / 60)^2 * r
   - Effective Gravity: g_eff = a_c / 9.80665 m/s^2
   - Normal Rim Reaction: F_N = m_crew * a_c
   - Coriolis Cross-Coupling: a_coriolis = -2 (omega x v_rel)

2. ISS FLIGHT PAYLOAD SPECIFICATIONS:
   - Form Factor: Double EXPRESS Rack Payload Locker (44 cm x 51.6 cm x 50.8 cm)
   - Rotational Range: 0.5 - 12.0 RPM
   - Dynamic Balancing: Counter-rotating momentum flywheel nullifying torque transfer
   - Power Consumption: 28V DC bus, 42W nominal operating load
   - Telemetry Interface: 1000BASE-T Ethernet with real-time JSON acceleration streaming

3. CONCLUSION & FLIGHT ROADMAP:
   Experimental prototype testing validates stability across 142,000+ simulated hours.
   Zero-G parabolic flight validation is scheduled under NASA Flight Opportunities.

================================================================================
End of NASA HUNCH Technical Document
`;
    const blob = new Blob([paperContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "NASA_HUNCH_Antigravity_Whitepaper_2026.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl bg-space-950 border border-cyan-500/40 shadow-2xl shadow-cyan-950/50 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-space-900/80">
          <div className="flex items-center space-x-2 text-cyan-400">
            <FileText className="w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-wider font-bold text-white">
              NASA HUNCH TECHNICAL WHITEPAPER VIEWER
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-space-950 font-bold text-xs tracking-wide transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF / Text</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-200 font-sans leading-relaxed">
          <div className="border-b border-slate-800 pb-4">
            <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
              PROJECT DOCUMENTATION • REF: HUNCH-EX-AG-2026
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Scalable Centrifugal Artificial Gravity Systems for Long-Duration Interplanetary Spaceflight
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-slate-400 mt-2">
              <span>Published: Sep 2026</span>
              <span>•</span>
              <span>NASA Johnson Space Center Mentorship</span>
              <span>•</span>
              <span>Status: PDR Approved</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 mb-2">
              Executive Abstract
            </h3>
            <p className="text-sm text-slate-300">
              Long-duration space missions to Mars and deep space expose human crews to extended 
              microgravity, resulting in progressive bone demineralization, neurovestibular ataxia, 
              and cephalad fluid shifts. While resistive exercise mitigates a fraction of 
              musculoskeletal loss, it fails to replace the systemic biological benefits of continuous 
              1.0g or partial 0.38g gravity environments.
            </p>
            <p className="text-sm text-slate-300 mt-2">
              This research proposes a dual-mode artificial gravity architecture: an ISS-compatible 
              micro-centrifuge locker payload for biological culture validation, paired with a 
              mathematical kinematic model for scalable tethered crew modules operating at 56m radius 
              and 4.0 RPM to prevent Coriolis-induced nausea.
            </p>
          </div>

          <div className="bg-space-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
              Key Engineering Conclusions
            </h3>
            <ul className="text-xs font-mono space-y-2 text-slate-300">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Radius threshold ≥ 45m required to maintain 1.0g below the 4.0 RPM vestibular comfort limit.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Dual counter-rotating momentum wheels eliminate 99.8% of micro-vibrational disturbances to ISS.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Integrated REST API service enables real-time orbital telemetry synchronization and fail-safe PID monitoring.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-space-900/60 text-xs font-mono text-slate-400">
          <span>Format: Standard NASA HUNCH Technical Memorandum</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
}
