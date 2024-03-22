/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,svelte}"],
  theme: {
    extend: {
      colors: {
        bgblue1: "#000428",
        bgblue2: "#000046",
        navy: "#000080",
        "blue-css": "#0000ff",
        "coral-css": "#ff7f50",
        "cyan-css": "#00FFFF",
        "btn-blue": "#003c5b",
        "border-blue": "#0891b2",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
