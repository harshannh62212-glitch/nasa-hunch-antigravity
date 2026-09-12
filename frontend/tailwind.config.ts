import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#030712",
          900: "#080d1a",
          850: "#0c1322",
          800: "#111b2e",
          700: "#1a2742",
          600: "#273a61",
        },
        hud: {
          cyan: "#00f0ff",
          emerald: "#10b981",
          amber: "#f59e0b",
          rose: "#f43f5e",
        },
        nasa: {
          blue: "#0b3d91",
          red: "#fc3d21",
        },
      },
      backgroundImage: {
        "grid-pattern": "radial-gradient(circle, rgba(0, 240, 255, 0.08) 1px, transparent 1px)",
        "mesh-glow": "radial-gradient(ellipse at 50% 0%, rgba(14, 165, 233, 0.15), transparent 70%)",
      },
      animation: {
        "spin-slow": "spin 24s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", filter: "drop-shadow(0 0 8px rgba(0, 240, 255, 0.3))" },
          "50%": { opacity: "0.8", filter: "drop-shadow(0 0 16px rgba(0, 240, 255, 0.6))" },
        },
      },
      fontFamily: {
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
