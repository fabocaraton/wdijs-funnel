import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        royal: {
          900: "#0D1147",
          700: "#1A237E",
          600: "#283593",
          500: "#3949AB",
          300: "#7986CB",
        },
        crimson: {
          DEFAULT: "#B71C1C",
          400: "#D32F2F",
          700: "#8B0000",
        },
        ivory: "#FAFAFA",
        lavender: "#C5CAE9",
      },
      fontFamily: {
        serif: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Satoshi"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
