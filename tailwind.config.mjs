/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        border: "var(--color-border)",
        "muted-foreground": "var(--color-muted-foreground)",
      },
      fontFamily: {
        serif: ["EB Garamond", "serif"],
        sans: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
