// tailwind.config.js

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pink1: "#EF5DA8",
        pink2: "#F178B6",
        pink3: "#FCDDEC",
        pink4: "#FFF4F9",
        blue1: "#5D5FEF",
        blue2: "#7879F1",
        blue3: "#A5A6F6",
        primary: "#5D5FEF",
        primaryLight: "#7879F1",
        primaryExtraLight: "#A5A6F6",
        secondary: "#EF5DA8",
        secondaryLight: "#F178B6",
        secondaryExtraLight: "#FCDDEC",
      },
      fontFamily: {
        sans: ["WorkSans_400Regular", "sans-serif"],
      },
      fontSize: {
        "header-1": ["30px", { lineHeight: "36px", fontWeight: "600" }], // Semi-bold, 30px
        "header-2": ["24px", { lineHeight: "28px", fontWeight: "600" }], // Semi-bold, 24px
        body: ["16px", { lineHeight: "20px", fontWeight: "400" }], // Regular, 16px
        texts: ["14px", { lineHeight: "18px", fontWeight: "400" }], // Regular, 14px
        "small-texts": ["12px", { lineHeight: "16px", fontWeight: "400" }], // Regular, 12px
      },
    },
  },
  plugins: [],
};
