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
        primary: '#0F1454',
        blueGray: {
          200: '#E2E8F0',
          700: '#334155',
          900: '#0F172A'
          
        },
        emerald: {
          400: '#34D399'
        }
      }
    }
  },
  plugins: [],
}

