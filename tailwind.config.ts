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
        brand: {
          50: "#fdf2f7",
          100: "#fce7f1",
          200: "#f9cfdf",
          300: "#f4a8c5",
          400: "#ea6fa0",
          500: "#d5006b",
          600: "#aa0055", // Color corporativo oficial AZ Directorio (--ink)
          700: "#8c0046",
          800: "#6b0036",
          900: "#450023", // Borgoña corporativo AZ Directorio (--brass)
          950: "#2b0016",
        },
        ink: {
          DEFAULT: "#aa0055",
          light: "#d5006b",
          dark: "#8c0046",
        },
        brass: {
          DEFAULT: "#8F6829",
          dark: "#450023",
          light: "#B8863D",
        },
        paper: {
          DEFAULT: "#EFEDE6",
          deep: "#E6E2D6",
          card: "#FBFAF6",
          hairline: "#D9D4C6",
        },
        azslate: {
          DEFAULT: "#2C2E33",
          soft: "#5B5F66",
        },
        forest: {
          DEFAULT: "#3F5A48",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "'DM Sans'", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-ibm-mono)", "'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
