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
          DEFAULT: "#34d399",
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
        green: {
          DEFAULT: "#34D399",
          50: "#A9ECD4",
          100: "#99E9CC",
          200: "#77E2BB",
          300: "#56DAAA",
          400: "#34D399",
          500: "#25AA79",
          600: "#1B7C59",
          700: "#114E38",
          800: "#072017",
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
  plugins: [require("tailwind-scrollbar")],
};
