/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryRed: "#9a1e02",
        warmYellow: "#dfa258",
        darkBase: "#0a0a0a",
        darkLayer: "#141414",
        darkSoft: "#1c1c1c",
      },
    },
  },
  plugins: [],
};
