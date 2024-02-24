/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#101E21",
        icons: "#717171",
        input: "Form",
        secondary: "#A15F43",
      },
      spacing: {},
      fontFamily: {
        overlock: "Overlock",
        "proxima-nova": "'Proxima Nova'",
        roboto: "Roboto",
        actor: "Actor",
        "brandon-grotesque": "'Brandon Grotesque'",
      },
      borderRadius: {
        "8xl": "27px",
        "35xl": "54px",
      },
      boxShadow: {
        form: "1px 1px 8.5px 0px rgba(0, 0, 0, 0.15)",
      },
    },
    fontSize: {
      base: "16px",
      "5xl": "24px",
      "29xl": "48px",
      xl: "20px",
      xs: "12px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
