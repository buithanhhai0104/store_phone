/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "screen-cover": "rgba(0, 0, 0, 0.8)",
      },
      boxShadow: {
        product: "0 1px 10px #ccc",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(272.75deg, #f38c25 38.99%, #fb6848 76.29%)",
      },
    },
  },
  plugins: [],
};
