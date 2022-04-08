module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#03438D",
        disable: "#A8B0B9",
        "disable-border": "#808080",
        active: "#EEC32A",
        light: "#9B9893",
        dark: "#000400",
        darkgray: "#A8B0B9",
        "c-bg": "#EFECE7",
        error: "#F57375",
        "header-border": "#000400",
        "setting-icon": "#E2EDFA",
        noPost1: "#DE4B63",
        noPost2: "#FAA722",
        noPost3: "#83C51D",
      },
      fontFamily: {
        paytone: ["'Paytone One'", "sans-serif"],
        helvetica: ["'Helvetica Neue'", "sans-serif"],
      },
      lineHeight: {
        1.4: "1.4",
      },
      boxShadow: {
        main: "-8px 8px 0px #00040029",
      },
    },
  },
  plugins: [],
};
