/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#20E1B2",
        lightGrey: "#FCF8FF",
        grey: "#EEE9F0",
        medium: "#9F9AA1",
        mediumDark: "#424242",
        green: "#437919",
      },
      
    },
  },
  plugins: [],
};
