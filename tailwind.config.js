/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,svelte}"],
  theme: {
    extend: {
      backgroundImage: {
        "books-pile": "url(images/robert-anasch-McX3XuJRsUM-unsplash.jpg)",
      },
      colors: {
        bgblue1: "#000428",
        bgblue2: "#000046",
        navy: "#000080",
        "blue-css": "#0000ff",
        "coral-css": "#ff7f50",
        "cyan-css": "#00FFFF",
        "btn-blue": "#003c5b",
        "border-blue": "#0891b2",
        "main-dark": "#2F2F2F",
        "light-grey": "#F5F5F5",
        "mid.grey": "#E2E0E0",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
