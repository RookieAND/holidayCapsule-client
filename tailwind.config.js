const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      fontSize: {
        h1: ["1.5rem", { lineHeight: "2rem", fontWeight: 700 }],
        h2: ["1.375rem", { lineHeight: "1.875rem", fontWeight: 700 }],
        h3: ["1.25rem", { lineHeight: "1.75rem", fontWeight: 700 }],
        h4: ["1.125rem", { lineHeight: "1.625rem", fontWeight: 700 }],
        subtitle1: ["1rem", { lineHeight: "1.5rem", fontWeight: 700 }],
        subtitle2: ["0.875rem", { lineHeight: "1.375rem", fontWeight: 700 }],
        body1: ["1.125rem", { lineHeight: "1.625rem", fontWeight: 500 }],
        body2: ["1rem", { lineHeight: "1.5rem", fontWeight: 400 }],
        body3: ["0.875rem", { lineHeight: "1.375rem", fontWeight: 400 }],
        caption: ["0.75rem", { lineHeight: "1.25rem", fontWeight: 500 }],
      },
      colors: {
        black: "#181818",
        creme: "#F9F9E8",
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#EEEEEE",
          300: "#DDDDDD",
          400: "#BBBBBB",
          500: "#999999",
          600: "#777777",
          700: "#5B5B5B",
          800: "#444444",
          900: "#262626",
        },
        red: {
          50: "#FDF1F2",
          100: "#FBE4E6",
          200: "#F8C9CD",
          300: "#F3A5AB",
          400: "#EC737E",
          500: "#D21C2A",
          600: "#BD1927",
          700: "#A71622",
          800: "#8C131D",
          900: "#630D14"
        },
        teal: {
          50: "#C7FFFE",
          100: "#70FFFD",
          200: "#00EBE7",
          300: "#00CCC9",
          400: "#00A3A0",
          500: "#006867",
          600: "#00615F",
          700: "#005250",
          800: "#004241",
          900: "#002E2D"
        },
      },
    },
  },
  plugins: [],
};

export default config;
