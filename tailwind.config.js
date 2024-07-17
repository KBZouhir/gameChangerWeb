/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F1454",
          50: "#3E4ADD",
          100: "#2D39D9",
          200: "#222DBC",
          300: "#1B2499",
          400: "#151C77",
          500: "#0F1454",
          600: "#070924",
          700: "#000000",
          800: "#000000",
          900: "#000000",
          950: "#000000",
        },
        blueGray: {
          200: "#E2E8F0",
          700: "#334155",
          900: "#0F172A",
        },
        emerald: {
          400: "#34D399",
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
