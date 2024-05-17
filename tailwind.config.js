/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "6px 3px 10px -5px rgba(255,255,255,0.51)",
      },
      colors: {
        plum: "rgb(23, 9, 29)",
        "purple-1000": "rgb(97, 83, 204)",
        "plum-300": "rgb(73, 43, 84)",
        "plum-500": "rgb(40, 17, 48)",
        "blue-munsell": "rgb(27, 154, 170)",
        "purple-power": "rgb(129, 110, 148)",
        frost: "rgba(255, 255, 255, 0.35)",
        "purple-grey": "rgb(34, 30, 43)",
        "purple-frost": "rgba(100,91,131,0.25)",
        'magenta': "rgb(149, 25, 68)",
      },
      height: {
        "1/10": "10%",
        "3/10": "30%",
        "11/20": "55%",
        "13/20": "65%",
        "11/50": "22%",
        "35/100": "35%",
        "90/100": "90%",
      },
      width: {
        "1/10": "10%",
        "3/10": "30%",
      },
    },
  },
  plugins: [require("daisyui")],
};
