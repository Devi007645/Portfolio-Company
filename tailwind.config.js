/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: "#00f5ff",
          violet: "#7b2fff",
          pink: "#ff2d78",
          green: "#00ff88",
        },
        space: {
          black: "#000010",
          dark: "#050518",
          card: "rgba(255,255,255,0.05)",
        },
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        glitch: "glitch 2s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glitch: {
          "0%": { textShadow: "2px 0 #00f5ff, -2px 0 #ff2d78" },
          "25%": { textShadow: "-2px 0 #00f5ff, 2px 0 #ff2d78" },
          "50%": { textShadow: "2px 0 #7b2fff, -2px 0 #00f5ff" },
          "75%": { textShadow: "-2px 0 #ff2d78, 2px 0 #7b2fff" },
          "100%": { textShadow: "2px 0 #00f5ff, -2px 0 #ff2d78" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
