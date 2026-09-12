"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Cpu,
  Layers,
  Users,
  ShieldCheck,
  FileText,
  Download,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface ResearchSectionProps {
  onOpenWhitepaper: () => void;
}

export default function ResearchSection({ onOpenWhitepaper }: ResearchSectionProps) {
  const [activeTab, setActiveTab] = useState<
    "methodology" | "iss-specs" | "cad-hardware" | "contributors"
  >("methodology");

  return (
    <section id="research" className="py-16 border-t border-slate-800/80 bg-space-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Flight Hardware &amp; Scientific Documentation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Research, Engineering &amp; ISS Flight Protocols
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
            Developed under the NASA HUNCH program to investigate rotational biomechanics,
            compact orbital centrifuge payloads, and counter-rotational torque mitigation.
          </p>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2 bg-space-900/90 p-1.5 rounded-xl border border-slate-700/80 text-xs font-mono">
            <button
              onClick={() => setActiveTab("methodology")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${
                activeTab === "methodology"
                  ? "bg-cyan-500 text-space-950 font-bold shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>1. Mathematical Methodology</span>
            </button>

            <button
              onClick={() => setActiveTab("iss-specs")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${
                activeTab === "iss-specs"
                  ? "bg-cyan-500 text-space-950 font-bold shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>2. ISS Express Rack Specs</span>
            </button>

            <button
              onClick={() => setActiveTab("cad-hardware")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${
                activeTab === "cad-hardware"
                  ? "bg-cyan-500 text-space-950 font-bold shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>3. CAD &amp; Hardware Prototypes</span>
            </button>

            <button
              onClick={() => setActiveTab("contributors")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${
                activeTab === "contributors"
                  ? "bg-cyan-500 text-space-950 font-bold shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>4. Contributors &amp; Mentors</span>
            </button>
          </div>
        </div>

        {/* Tab Content Cards */}
        <div className="max-w-5xl mx-auto">
          {activeTab === "methodology" && (
            <div className="hud-panel p-6 sm:p-8 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <span className="text-cyan-400 font-mono">§ 1.0</span>
                  <span>Centrifugal Artificial Gravity &amp; Vestibular Mechanics</span>
                </h3>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                  AEROSPACE PHYSIOLOGY
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
                <div className="space-y-4">
                  <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-cyan-300">
                    Governing Formulations
                  </h4>
                  <p className="leading-relaxed">
                    Centripetal acceleration is generated along the inner hull surface:
                  </p>
                  <div className="bg-space-950/90 p-3 rounded-lg border border-slate-800 font-mono text-cyan-300 text-xs">
                    a_c = ω² · r = [(2π · RPM) / 60]² · r
                  </div>
                  <p className="leading-relaxed">
                    The resulting apparent gravity ratio is expressed in standard Earth gravities:
                  </p>
                  <div className="bg-space-950/90 p-3 rounded-lg border border-slate-800 font-mono text-cyan-300 text-xs">
                    g_eff = a_c / 9.80665 m/s²
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-300">
                    Coriolis Cross-Coupling Dynamics
                  </h4>
                  <p className="leading-relaxed">
                    When an astronaut tilts their head while rotating in the centrifuge, a cross-coupled 
                    angular acceleration stimulates the semicircular canals perpendicularly:
                  </p>
                  <div className="bg-space-950/90 p-3 rounded-lg border border-slate-800 font-mono text-amber-300 text-xs">
                    a_coriolis = -2 (ω × v_rel)
                  </div>
                  <p className="text-xs text-slate-400">
                    Clinical studies indicate that rotation speeds under <strong>3.0 – 4.0 RPM</strong> allow 
                    unimpaired locomotion with negligible motion sickness, making larger radii (40m–60m) preferable 
                    for long-duration deep space exploration.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "iss-specs" && (
            <div className="hud-panel p-6 sm:p-8 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <span className="text-cyan-400 font-mono">§ 2.0</span>
                  <span>International Space Station Integration Compatibility</span>
                </h3>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
                  EXPRESS RACK COMPLIANT
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-space-950/80 border border-slate-800">
                  <div className="text-slate-400 uppercase">Locker Envelope</div>
                  <div className="text-lg font-bold text-white mt-1">Single Locker (2U / 4U)</div>
                  <div className="text-slate-500 mt-1">44.0 cm × 51.6 cm × 25.3 cm maximum payload volume.</div>
                </div>

                <div className="p-4 rounded-xl bg-space-950/80 border border-slate-800">
                  <div className="text-slate-400 uppercase">Power &amp; Bus Draw</div>
                  <div className="text-lg font-bold text-cyan-400 mt-1">28V DC @ 5.0A Peak</div>
                  <div className="text-slate-500 mt-1">Isolated brushless driver with regenerative braking dump.</div>
                </div>

                <div className="p-4 rounded-xl bg-space-950/80 border border-slate-800">
                  <div className="text-slate-400 uppercase">Microgravity Safety</div>
                  <div className="text-lg font-bold text-emerald-400 mt-1">Torque Balanced</div>
                  <div className="text-slate-500 mt-1">Counter-rotating flywheel eliminates angular momentum transfer to ISS.</div>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                The payload satisfies NASA Flight Safety Standards (SSP 51700) for Category 1 
                microgravity containment. Dual optical rotary encoders measure instantaneous angular 
                velocity with 0.05 RPM accuracy, feeding closed-loop PID controllers to maintain 
                constant g-loadings across biological samples.
              </p>
            </div>
          )}

          {activeTab === "cad-hardware" && (
            <div className="hud-panel p-6 sm:p-8 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <span className="text-cyan-400 font-mono">§ 3.0</span>
                  <span>CAD Assemblies &amp; Structural Prototypes</span>
                </h3>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-950/80 border border-blue-500/30 text-blue-300">
                  PROTOTYPE ITERATION 4
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-space-950/80 border border-slate-800">
                  <h4 className="font-mono text-sm font-bold text-cyan-300">
                    CFRP Composite Rotor Ring
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-sans">
                    Constructed with high-modulus carbon-fiber reinforced polymer (CFRP) yielding 
                    a tensile yield strength exceeding 2,200 MPa while minimizing rotational inertia.
                  </p>
                  <div className="mt-3 text-[11px] font-mono text-slate-500">
                    Weight: 4.82 kg • Safety Factor: 4.2x Ultimate
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-space-950/80 border border-slate-800">
                  <h4 className="font-mono text-sm font-bold text-cyan-300">
                    Dual-Channel Optoelectronic Slip Ring
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-sans">
                    Enables uninterrupted bi-directional 1000BASE-T Ethernet telemetry and continuous 
                    high-current power transfer without electrical noise or mechanical degradation.
                  </p>
                  <div className="mt-3 text-[11px] font-mono text-slate-500">
                    Bandwidth: 1.0 Gbps • Gold-on-Gold contact brushes
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "contributors" && (
            <div className="hud-panel p-6 sm:p-8 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <span className="text-cyan-400 font-mono">§ 4.0</span>
                  <span>Student Engineers &amp; NASA HUNCH Mentors</span>
                </h3>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-950/80 border border-purple-500/30 text-purple-300">
                  ACADEMIC PARTNERSHIP
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-space-950/80 border border-slate-800">
                  <div className="text-slate-400 uppercase">Research Lead</div>
                  <div className="text-sm font-bold text-white mt-1">NASA HUNCH Student Team</div>
                  <div className="text-slate-500 mt-1">Advanced Physics &amp; Mechanical Engineering Division</div>
                </div>

                <div className="p-4 rounded-xl bg-space-950/80 border border-slate-800">
                  <div className="text-slate-400 uppercase">NASA Mentorship</div>
                  <div className="text-sm font-bold text-cyan-400 mt-1">Johnson Space Center</div>
                  <div className="text-slate-500 mt-1">Flight Hardware Mentors &amp; EXPRESS Payload Reviewers</div>
                </div>

                <div className="p-4 rounded-xl bg-space-950/80 border border-slate-800">
                  <div className="text-slate-400 uppercase">Flight Review Phase</div>
                  <div className="text-sm font-bold text-emerald-400 mt-1">PDR / CDR Complete</div>
                  <div className="text-slate-500 mt-1">Zero-G Parabolic Flight Test Verification Phase</div>
                </div>
              </div>
            </div>
          )}

          {/* Downloadable Whitepaper & Abstract Callout Banner */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-space-900 via-cyan-950/40 to-space-900 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  Technical Abstract &amp; Whitepaper Publication
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Download the complete peer-reviewed study (PDF): &ldquo;Kinematic Analysis of Centrifugal Habitats in Low Earth Orbit&rdquo;
                </p>
              </div>
            </div>

            <button
              onClick={onOpenWhitepaper}
              className="whitespace-nowrap px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-space-950 font-bold text-xs tracking-wide transition-all shadow-md shadow-cyan-500/20 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Read Whitepaper / Download</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
