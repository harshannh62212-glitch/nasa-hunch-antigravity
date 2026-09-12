"use client";

import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  ReferenceLine,
  Legend,
} from "recharts";
import { STANDARD_GRAVITY } from "@/lib/physics";
import { Layers, BarChart3 } from "lucide-react";

interface GravityChartProps {
  currentRadius: number;
  currentRpm: number;
  currentGForce: number;
  payloadMass: number;
}

export default function GravityChart({
  currentRadius,
  currentRpm,
  currentGForce,
  payloadMass,
}: GravityChartProps) {
  const [chartMode, setChartMode] = useState<"radius-vs-g" | "mass-vs-force">("radius-vs-g");

  // Generate data points for Radius vs G-Force at various RPMs
  const radiusVsGData = useMemo(() => {
    const data = [];
    for (let r = 5; r <= 100; r += 5) {
      const calcG = (rpmVal: number) => {
        const omega = (2 * Math.PI * rpmVal) / 60;
        return Number(((Math.pow(omega, 2) * r) / STANDARD_GRAVITY).toFixed(3));
      };

      const currentPointG = Number(
        ((Math.pow((2 * Math.PI * currentRpm) / 60, 2) * r) / STANDARD_GRAVITY).toFixed(3)
      );

      data.push({
        radius: r,
        currentRpmG: currentPointG,
        rpm2: calcG(2.0),
        rpm4: calcG(4.0),
        rpm6: calcG(6.0),
      });
    }
    return data;
  }, [currentRpm]);

  // Generate data points for Simulated Mass vs Structural Centrifugal Force (N)
  // F = m * a_c (where a_c is centripetal acceleration at current radius & RPM)
  const massVsForceData = useMemo(() => {
    const omega = (2 * Math.PI * currentRpm) / 60;
    const accel = Math.pow(omega, 2) * currentRadius;

    const data = [];
    for (let m = 20; m <= 150; m += 10) {
      const forceN = Number((m * accel).toFixed(1));
      data.push({
        mass: m,
        forceNewtons: forceN,
        accelMs2: Number(accel.toFixed(2)),
      });
    }
    return data;
  }, [currentRadius, currentRpm]);

  return (
    <div className="hud-panel p-5 rounded-2xl">
      {/* Chart Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400">
            <BarChart3 className="w-4 h-4" />
            <h3 className="text-sm font-bold font-mono tracking-wider uppercase text-white">
              Centrifugal Telemetry Matrix
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            {chartMode === "radius-vs-g"
              ? "Artificial Gravity Acceleration (g) across Habitat Radius (m)"
              : `Centrifugal Tension Force (N) vs. Crew/Payload Mass (kg) at ${currentRadius}m & ${currentRpm} RPM`}
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex rounded-lg bg-space-950 p-0.5 border border-slate-700/80 text-xs font-mono">
          <button
            onClick={() => setChartMode("radius-vs-g")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              chartMode === "radius-vs-g"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Radius vs. G-Force
          </button>
          <button
            onClick={() => setChartMode("mass-vs-force")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              chartMode === "mass-vs-force"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Mass vs. Tension
          </button>
        </div>
      </div>

      {/* Chart Canvas Container */}
      <div className="h-[280px] w-full">
        {chartMode === "radius-vs-g" ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={radiusVsGData}
              margin={{ top: 10, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.07)" />
              <XAxis
                dataKey="radius"
                stroke="#64748b"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                unit="m"
              />
              <YAxis
                stroke="#64748b"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                unit="g"
                domain={[0, "auto"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0b0f19",
                  borderColor: "rgba(6, 182, 212, 0.3)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#f8fafc",
                }}
              />
              <Legend
                verticalAlign="top"
                height={30}
                wrapperStyle={{ fontSize: "11px", fontFamily: "ui-monospace, monospace" }}
              />

              {/* Benchmark Reference Lines */}
              <ReferenceLine y={1.0} stroke="#10b981" strokeDasharray="4 4" label={{ value: "Earth 1.0g", fill: "#10b981", fontSize: 10 }} />
              <ReferenceLine y={0.38} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: "Mars 0.38g", fill: "#f59e0b", fontSize: 10 }} />

              {/* Dynamic current user curve */}
              <Line
                type="monotone"
                dataKey="currentRpmG"
                name={`Active: ${currentRpm.toFixed(1)} RPM`}
                stroke="#00f0ff"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="rpm2"
                name="2.0 RPM (Comfort)"
                stroke="#64748b"
                strokeWidth={1.5}
                strokeDasharray="3 3"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="rpm4"
                name="4.0 RPM (Standard)"
                stroke="#38bdf8"
                strokeWidth={1.5}
                strokeDasharray="3 3"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="rpm6"
                name="6.0 RPM (Limit)"
                stroke="#f43f5e"
                strokeWidth={1.5}
                strokeDasharray="3 3"
                dot={false}
              />

              {/* Operating Point Dot */}
              <ReferenceDot
                x={currentRadius}
                y={currentGForce}
                r={6}
                fill="#00f0ff"
                stroke="#ffffff"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={massVsForceData}
              margin={{ top: 10, right: 20, left: -5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.07)" />
              <XAxis
                dataKey="mass"
                stroke="#64748b"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                unit="kg"
              />
              <YAxis
                stroke="#64748b"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                unit="N"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0b0f19",
                  borderColor: "rgba(6, 182, 212, 0.3)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#f8fafc",
                }}
              />
              <Legend
                verticalAlign="top"
                height={30}
                wrapperStyle={{ fontSize: "11px", fontFamily: "ui-monospace, monospace" }}
              />
              <Line
                type="monotone"
                dataKey="forceNewtons"
                name={`Rim Structural Tension (N) @ ${currentGForce.toFixed(2)}g`}
                stroke="#f59e0b"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#f59e0b" }}
              />
              <ReferenceDot
                x={payloadMass}
                y={Number((payloadMass * currentGForce * STANDARD_GRAVITY).toFixed(1))}
                r={6}
                fill="#00f0ff"
                stroke="#ffffff"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/60 pt-2">
        <span>Current Operating Coordinate: [{currentRadius}m, {currentGForce.toFixed(2)}g]</span>
        <span className="text-cyan-400 font-semibold">
          {currentGForce >= 0.8 && currentGForce <= 1.1
            ? "✓ Earth-Equivalent Zone"
            : currentGForce >= 0.3 && currentGForce <= 0.45
            ? "✓ Mars-Equivalent Zone"
            : currentGForce < 0.3
            ? "⚠ Lunar / Low-G Regime"
            : "⚡ Hyper-Gravity Regime"}
        </span>
      </div>
    </div>
  );
}
