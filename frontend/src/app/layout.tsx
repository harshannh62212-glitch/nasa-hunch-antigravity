import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NASA HUNCH | Microgravity & Antigravity Research Initiative",
  description: "Advanced simulation, centrifugal artificial gravity modeling, and spaceflight hardware research developed under the NASA HUNCH program.",
  keywords: ["NASA", "HUNCH", "Antigravity", "Artificial Gravity", "Centrifuge", "ISS", "Physics Simulation"],
  authors: [{ name: "NASA HUNCH Student Research Division" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-space-950 text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
