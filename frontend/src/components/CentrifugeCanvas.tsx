"use client";

import React, { useRef, useEffect } from "react";
import { Maximize2 } from "lucide-react";

interface CentrifugeCanvasProps {
  radius: number;
  rpm: number;
  gForce: number;
}

export default function CentrifugeCanvas({ radius, rpm, gForce }: CentrifugeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const angleRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const render = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaTime = (time - lastTimeRef.current) / 1000.0;
      lastTimeRef.current = time;

      // Update rotation angle based on RPM: (RPM * 360 deg / 60 s) * deltaTime
      const degPerSec = (rpm * 360) / 60.0;
      angleRef.current = (angleRef.current + degPerSec * deltaTime) % 360;
      const angleRad = (angleRef.current * Math.PI) / 180;

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Scale visual radius to canvas dimensions (clamped visually between 60px and 165px)
      // Actual radius ranges from 5m to 100m
      const minRadiusPx = 70;
      const maxRadiusPx = Math.min(width, height) * 0.42;
      const visualRadius = minRadiusPx + ((radius - 5) / (100 - 5)) * (maxRadiusPx - minRadiusPx);

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Background Space Grid & Radial Reference Circles
      ctx.save();
      ctx.strokeStyle = "rgba(6, 182, 212, 0.08)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);

      // Range indicator rings
      [minRadiusPx, (minRadiusPx + maxRadiusPx) / 2, maxRadiusPx].forEach((r) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Axis crosshairs
      ctx.beginPath();
      ctx.moveTo(centerX - maxRadiusPx - 20, centerY);
      ctx.lineTo(centerX + maxRadiusPx + 20, centerY);
      ctx.moveTo(centerX, centerY - maxRadiusPx - 20);
      ctx.lineTo(centerX, centerY + maxRadiusPx + 20);
      ctx.stroke();
      ctx.restore();

      // 2. Rotating Space Station Centrifuge
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angleRad);

      // Draw Spokes (4 structural trusses)
      const numSpokes = 4;
      ctx.strokeStyle = "rgba(148, 163, 184, 0.4)";
      ctx.lineWidth = 2.5;
      for (let i = 0; i < numSpokes; i++) {
        const spokeAngle = (i * Math.PI * 2) / numSpokes;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(spokeAngle) * visualRadius, Math.sin(spokeAngle) * visualRadius);
        ctx.stroke();

        // Truss diagonal braces
        ctx.beginPath();
        ctx.strokeStyle = "rgba(6, 182, 212, 0.2)";
        ctx.lineWidth = 1;
        const midR = visualRadius * 0.55;
        const nextSpokeAngle = ((i + 0.3) * Math.PI * 2) / numSpokes;
        ctx.moveTo(Math.cos(spokeAngle) * midR, Math.sin(spokeAngle) * midR);
        ctx.lineTo(Math.cos(nextSpokeAngle) * midR, Math.sin(nextSpokeAngle) * midR);
        ctx.stroke();
      }

      // Outer Rim Double Ring Hull
      ctx.beginPath();
      ctx.arc(0, 0, visualRadius + 10, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(6, 182, 212, 0.8)";
      ctx.lineWidth = 3;
      ctx.shadowColor = "#06b6d4";
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(0, 0, visualRadius - 8, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(51, 65, 85, 0.9)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Habitation Pods along the rim
      const podCount = 8;
      for (let i = 0; i < podCount; i++) {
        const pAngle = (i * Math.PI * 2) / podCount;
        const px = Math.cos(pAngle) * visualRadius;
        const py = Math.sin(pAngle) * visualRadius;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(pAngle + Math.PI / 2);

        // Pod module body
        ctx.fillStyle = i % 2 === 0 ? "#0f172a" : "#1e293b";
        ctx.strokeStyle = i === 0 ? "#22d3ee" : "#64748b";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(-12, -7, 24, 14, 3);
        ctx.fill();
        ctx.stroke();

        // Pod window glow
        ctx.fillStyle = i === 0 ? "#38bdf8" : "rgba(34, 211, 238, 0.4)";
        ctx.fillRect(-6, 2, 12, 2);

        ctx.restore();
      }

      // Crew member marker in Pod 0 (Standing with feet against outer deck - simulated floor)
      ctx.save();
      const crewX = visualRadius - 1;
      ctx.fillStyle = "#f59e0b"; // Golden astronaut suit
      ctx.beginPath();
      ctx.arc(crewX - 4, 0, 3, 0, Math.PI * 2); // Helmet
      ctx.fill();
      ctx.fillRect(crewX - 10, -2, 6, 4); // Torso & boots against deck
      ctx.restore();

      // Center Hub (Stationary co-rotating hub)
      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 2);
      ctx.fillStyle = "#090d16";
      ctx.fill();
      ctx.strokeStyle = "rgba(6, 182, 212, 0.6)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#06b6d4";
      ctx.fill();

      ctx.restore(); // End rotation

      // 3. Static HUD Overlays (Radius meter line and G-Force Vector)
      // Radius line indicator (Pointing East horizontally)
      ctx.save();
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + visualRadius, centerY);
      ctx.stroke();

      // Radius text label
      ctx.fillStyle = "#38bdf8";
      ctx.font = "11px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.fillText(`r = ${radius.toFixed(1)} m`, centerX + visualRadius / 2, centerY - 8);

      // Outward Centrifugal Gravity Vector Arrow
      const arrowStart = centerX + visualRadius;
      const arrowLength = Math.min(65, Math.max(15, gForce * 35));
      const arrowEnd = arrowStart + arrowLength;

      ctx.strokeStyle = gForce > 1.2 ? "#f43f5e" : gForce > 0.4 ? "#10b981" : "#06b6d4";
      ctx.lineWidth = 2.5;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(arrowStart + 6, centerY);
      ctx.lineTo(arrowEnd, centerY);
      // Arrowhead
      ctx.lineTo(arrowEnd - 8, centerY - 5);
      ctx.moveTo(arrowEnd, centerY);
      ctx.lineTo(arrowEnd - 8, centerY + 5);
      ctx.stroke();

      // Vector Label
      ctx.fillStyle = ctx.strokeStyle;
      ctx.font = "bold 11px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.fillText(`${gForce.toFixed(2)}g (OUTWARD)`, arrowEnd + 6, centerY + 4);
      ctx.restore();

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [radius, rpm, gForce]);

  return (
    <div className="relative w-full aspect-square max-w-[440px] mx-auto rounded-2xl bg-space-900/90 border border-cyan-500/30 p-2 overflow-hidden shadow-2xl">
      {/* HUD Header overlay */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-cyan-400/80 z-10 pointer-events-none">
        <div className="flex items-center space-x-1.5 bg-space-950/70 px-2 py-0.5 rounded border border-cyan-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>REAL-TIME CENTRIFUGAL VECTOR</span>
        </div>
        <div className="bg-space-950/70 px-2 py-0.5 rounded border border-cyan-500/20 text-slate-300">
          {rpm.toFixed(1)} RPM
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={440}
        height={440}
        className="w-full h-full block rounded-xl"
      />

      {/* HUD Bottom Legend */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-slate-400 z-10 pointer-events-none">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span>Crew Pod Orientation</span>
        </div>
        <div className="text-cyan-300 font-semibold">
          Scale: {radius}m Hab
        </div>
      </div>
    </div>
  );
}
