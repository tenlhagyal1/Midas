/** @type {import('tailwindcss').Config}*/
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "white",
        none: "none"  
      },
      borderWidth: {
        1: "1px",
      },
      fontFamily: {
        sans: ["Source Sans Pro", "sans-serif"],
      },
      gridTemplateRows: {
        7: "repreat(7, minmax(0, 1fr))",
        8: "repreat(8, minmax(0, 1fr))", // tailwind css template rules
      },
    }
  },
  plugins: []
};
