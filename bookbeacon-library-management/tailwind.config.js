/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4B5EAA",
          dark: "#6B7280",
        },
        background: {
          light: "#F9FAFB",
          dark: "#1F2937",
        },
        card: {
          light: "#FFFFFF",
          dark: "#374151",
        },
      },
    },
  },
  plugins: [],
};
