"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  calculateGravityAPI,
  checkBackendHealth,
  ApiHealthStatus,
} from "@/lib/api";
import {
  GravityCalculationResult,
  PRESET_MISSIONS,
  PresetMission,
  computeLocalGravity,
} from "@/lib/physics";
import CentrifugeCanvas from "./CentrifugeCanvas";
import GravityChart from "./GravityChart";
import {
  Sliders,
  RotateCw,
  Gauge,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Server,
  Cloud,
  Layers,
  HeartPulse,
  Scale,
  Satellite,
} from "lucide-react";

export default function SimulationDashboard() {
  const [radius, setRadius] = useState<number>(56);
  const [rpm, setRpm] = useState<number>(4.0);
  const [payloadMass, setPayloadMass] = useState<number>(85);
  const [activePreset, setActivePreset] = useState<string>("earth-standard");

  const [telemetry, setTelemetry] = useState<GravityCalculationResult>(() =>
    computeLocalGravity(56, 4.0, 85)
  );

  const [backendSync, setBackendSync] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastLatency, setLastLatency] = useState<number | null>(null);
  const [autoSyncBackend, setAutoSyncBackend] = useState<boolean>(false);

  // Synchronize physics locally first for instant UI response
  useEffect(() => {
    const local = computeLocalGravity(radius, rpm, payloadMass);
    setTelemetry((prev) => ({
      ...local,
      is_backend_sync: prev.is_backend_sync && !autoSyncBackend ? prev.is_backend_sync : false,
    }));

    if (autoSyncBackend) {
      const handler = setTimeout(() => {
        triggerBackendSync();
      }, 250);
      return () => clearTimeout(handler);
    }
  }, [radius, rpm, payloadMass, autoSyncBackend]);

  const triggerBackendSync = useCallback(async () => {
    setIsSyncing(true);
    const { result, fromBackend, latencyMs } = await calculateGravityAPI({
      radius,
      rpm,
      payload_mass: payloadMass,
    });
    setTelemetry(result);
    setBackendSync(fromBackend);
    setLastLatency(latencyMs);
    setIsSyncing(false);
  }, [radius, rpm, payloadMass]);

  const handleApplyPreset = (preset: PresetMission) => {
    setActivePreset(preset.id);
    setRadius(preset.radius);
    setRpm(preset.rpm);
  };

  const getComfortBadge = () => {
    switch (telemetry.coriolis.rating) {
      case "OPTIMAL":
        return {
          bg: "bg-emerald-950/60 border-emerald-500/40 text-emerald-300",
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
          label: "Optimal Vestibular Comfort",
        };
      case "ADAPTATION_REQUIRED":
        return {
          bg: "bg-amber-950/60 border-amber-500/40 text-amber-300",
          icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
          label: "Neuro-Adaptation Needed (24-48h)",
        };
      case "MOTION_SICKNESS_RISK":
      default:
        return {
          bg: "bg-rose-950/60 border-rose-500/40 text-rose-300",
          icon: <AlertTriangle className="w-4 h-4 text-rose-400" />,
          label: "High Coriolis Sickness Risk",
        };
    }
  };

  const comfortInfo = getComfortBadge();

  return (
    <section id="simulator" className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
              <Sliders className="w-4 h-4" />
              <span>Interactive Telemetry &amp; Physics Engine</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Artificial Gravity Simulation Dashboard
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl font-mono">
              Adjust rotational parameters to calculate centripetal gravity, tangential velocity,
              structural rim tension, and Coriolis cross-coupling comfort.
            </p>
          </div>

          {/* FastAPI Backend Trigger Bar */}
          <div className="flex items-center space-x-3 bg-space-900/90 border border-slate-700/80 p-2 rounded-xl text-xs font-mono">
            <button
              onClick={triggerBackendSync}
              disabled={isSyncing}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-space-950 font-bold tracking-wide transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
              <span>Compute via FastAPI</span>
            </button>

            <div className="flex items-center space-x-2 text-[11px] text-slate-400 border-l border-slate-700 pl-3">
              {telemetry.is_backend_sync ? (
                <span className="text-emerald-400 flex items-center space-x-1 font-semibold">
                  <Cloud className="w-3.5 h-3.5" />
                  <span>Verified ({lastLatency}ms)</span>
                </span>
              ) : (
                <span className="text-slate-400 flex items-center space-x-1">
                  <Server className="w-3.5 h-3.5" />
                  <span>Client Physics</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mission Presets Selector */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-2">
            <Satellite className="w-3.5 h-3.5 text-cyan-400" />
            <span>Mission Architecture Presets:</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {PRESET_MISSIONS.map((preset) => {
              const isSelected = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-500/20"
                      : "bg-space-900/60 border-slate-800 hover:border-slate-700 text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white">{preset.name}</span>
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                      {preset.targetG}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Simulator Core: Controls (Left) & Canvas Visualizer (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="hud-panel p-6 rounded-2xl">
              <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-300 font-bold mb-6 flex items-center space-x-2">
                <Sliders className="w-4 h-4" />
                <span>Habitat Kinematic Controls</span>
              </h3>

              {/* Slider 1: Radius */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2 font-mono">
                  <label className="text-xs text-slate-300 flex items-center space-x-1.5">
                    <span>Centrifuge Radius (r)</span>
                    <span className="text-[10px] text-slate-500">[5m – 100m]</span>
                  </label>
                  <span className="text-sm font-bold text-cyan-400 bg-space-950 px-2.5 py-0.5 rounded border border-cyan-500/30">
                    {radius} meters
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="0.5"
                  value={radius}
                  onChange={(e) => {
                    setRadius(parseFloat(e.target.value));
                    setActivePreset("");
                  }}
                  className="w-full h-2 bg-space-950 rounded-lg cursor-pointer border border-slate-700"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>5m (CubeLab)</span>
                  <span>30m (Lunar)</span>
                  <span>56m (Earth 1G)</span>
                  <span>100m (Deep Space Hab)</span>
                </div>
              </div>

              {/* Slider 2: RPM */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2 font-mono">
                  <label className="text-xs text-slate-300 flex items-center space-x-1.5">
                    <span>Rotational Velocity (RPM)</span>
                    <span className="text-[10px] text-slate-500">[0.5 – 12.0 RPM]</span>
                  </label>
                  <span className="text-sm font-bold text-cyan-400 bg-space-950 px-2.5 py-0.5 rounded border border-cyan-500/30">
                    {rpm.toFixed(1)} RPM
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="12.0"
                  step="0.1"
                  value={rpm}
                  onChange={(e) => {
                    setRpm(parseFloat(e.target.value));
                    setActivePreset("");
                  }}
                  className="w-full h-2 bg-space-950 rounded-lg cursor-pointer border border-slate-700"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>0.5 RPM</span>
                  <span className="text-emerald-400">3.0 RPM (Comfort limit)</span>
                  <span className="text-amber-400">6.0 RPM (Max tolerable)</span>
                  <span>12.0 RPM</span>
                </div>
              </div>

              {/* Slider 3: Crew / Payload Mass */}
              <div>
                <div className="flex justify-between items-center mb-2 font-mono">
                  <label className="text-xs text-slate-300 flex items-center space-x-1.5">
                    <Scale className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Crew / Payload Mass (m)</span>
                  </label>
                  <span className="text-sm font-bold text-slate-200 bg-space-950 px-2.5 py-0.5 rounded border border-slate-700">
                    {payloadMass} kg
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="150"
                  step="5"
                  value={payloadMass}
                  onChange={(e) => setPayloadMass(parseInt(e.target.value))}
                  className="w-full h-2 bg-space-950 rounded-lg cursor-pointer border border-slate-700"
                />
              </div>
            </div>

            {/* Primary Telemetry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Telemetry Card 1: G-Force */}
              <div className="hud-panel p-4 rounded-xl border-l-4 border-l-cyan-400">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Simulated Gravity
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-1">
                  {telemetry.g_force.toFixed(2)}
                  <span className="text-sm text-cyan-400 ml-1">g</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-1">
                  {(telemetry.g_force * 100).toFixed(0)}% Earth G
                </div>
              </div>

              {/* Telemetry Card 2: Centripetal Acceleration */}
              <div className="hud-panel p-4 rounded-xl">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Centripetal Accel
                </div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-300 mt-1">
                  {telemetry.centripetal_acceleration_ms2.toFixed(2)}
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">m/s² at rim deck</div>
              </div>

              {/* Telemetry Card 3: Tangential Velocity */}
              <div className="hud-panel p-4 rounded-xl">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Tangential Speed
                </div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                  {telemetry.tangential_velocity_ms.toFixed(1)}
                  <span className="text-xs text-slate-400 ml-1">m/s</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">
                  {telemetry.tangential_velocity_kmh.toFixed(0)} km/h
                </div>
              </div>

              {/* Telemetry Card 4: Rim Tension Force */}
              <div className="hud-panel p-4 rounded-xl">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Rim Normal Force
                </div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300 mt-1">
                  {telemetry.rim_tension_force_n.toFixed(0)}
                  <span className="text-xs text-slate-400 ml-1">N</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">
                  Crew mass ({payloadMass}kg)
                </div>
              </div>
            </div>

            {/* Coriolis & Neurovestibular Tolerance Bar */}
            <div className={`p-4 rounded-xl border ${comfortInfo.bg}`}>
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">{comfortInfo.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">
                      {comfortInfo.label}
                    </span>
                    <span className="text-xs font-mono font-bold">
                      Index: {(telemetry.coriolis.comfort_score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <p className="text-xs font-sans mt-1 leading-relaxed opacity-90">
                    {telemetry.coriolis.explanation}
                  </p>
                  <div className="mt-2 text-[10px] font-mono opacity-80 flex items-center space-x-3">
                    <span>Angular Velocity: {telemetry.angular_velocity_rad_s.toFixed(3)} rad/s</span>
                    <span>•</span>
                    <span>Head-tilt gradient: ~{telemetry.coriolis.head_tilt_cross_coupling_degs} rad/s²</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Canvas Visualizer Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <CentrifugeCanvas
              radius={radius}
              rpm={rpm}
              gForce={telemetry.g_force}
            />

            {/* Real-time Orbital Co-Flight Telemetry Box */}
            <div className="w-full max-w-[440px] mt-4 hud-panel p-3.5 rounded-xl text-xs font-mono">
              <div className="flex items-center justify-between text-slate-300 border-b border-slate-800 pb-1.5 mb-2">
                <span className="flex items-center space-x-1.5 text-cyan-400 font-bold">
                  <Satellite className="w-3.5 h-3.5" />
                  <span>SIMULATED ORBITAL CO-FLIGHT</span>
                </span>
                <span className="text-[10px] text-emerald-400">LEO INCLINATION 51.6°</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                <div>
                  Altitude: <span className="text-white font-semibold">{telemetry.orbital_telemetry.altitude_km} km</span>
                </div>
                <div>
                  Orbit Velocity: <span className="text-white font-semibold">{telemetry.orbital_telemetry.orbital_velocity_kms} km/s</span>
                </div>
                <div>
                  Period: <span className="text-white font-semibold">{telemetry.orbital_telemetry.orbital_period_minutes} min</span>
                </div>
                <div>
                  Ambient G: <span className="text-white font-semibold">1.0 × 10⁻⁶ g</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Matrix: Curves Chart */}
        <div className="mt-8">
          <GravityChart
            currentRadius={radius}
            currentRpm={rpm}
            currentGForce={telemetry.g_force}
            payloadMass={payloadMass}
          />
        </div>
      </div>
    </section>
  );
}
