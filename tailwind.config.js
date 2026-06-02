/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        // Deep forest backgrounds
        ink: {
          950: "#03120b",
          900: "#06211a",
          800: "#0a3327",
          700: "#114738",
        },
        // Primary emerald scale (kept "iris" key for backward-compat)
        iris: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        // Accent glow colors (kept old keys; new values are mint/emerald/gold)
        glow: {
          cyan: "#5eff9b",   // mint
          violet: "#34d399", // emerald
          magenta: "#facc15",// warm gold accent
          sage: "#a7f3d0",
          gold: "#f5d76e",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 18s linear infinite",
        "spin-slower": "spin 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        blink: "blink 6s ease-in-out infinite",
        sweep: "sweep 4s ease-in-out infinite",
        breathe: "breathe 7s ease-in-out infinite",
        leaf: "leaf 14s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blink: {
          "0%, 92%, 100%": { transform: "scaleY(1)" },
          "95%": { transform: "scaleY(0.05)" },
        },
        sweep: {
          "0%, 100%": { transform: "translateX(-110%) rotate(8deg)", opacity: "0" },
          "40%": { opacity: "0.6" },
          "60%": { opacity: "0.6" },
          "100%": { transform: "translateX(110%) rotate(8deg)", opacity: "0" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.7" },
          "50%": { transform: "scale(1.08)", opacity: "1" },
        },
        leaf: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(4deg)" },
        },
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(ellipse at center, rgba(94,255,155,0.16) 0%, rgba(0,0,0,0) 60%)",
        grid:
          "linear-gradient(rgba(167,243,208,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(167,243,208,0.05) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
