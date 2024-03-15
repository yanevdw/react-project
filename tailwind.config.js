/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "6px 3px 10px -5px rgba(255,255,255,0.51)",
      },
      colors: {
        "blue-purple": "rgb(0, 8, 52)",
        "purple-1000": "rgb(97, 83, 204)",
      },
      height: {
        "1/10": "10%",
        "3/10": "30%",
      },
      width: {
        "1/10": "10%",
      },
    },
  },
  plugins: [require("daisyui")],
};
