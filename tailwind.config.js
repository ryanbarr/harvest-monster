/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.svelte", "./packages/renderer/**/*.{html,svelte,css}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        container: "var(--color-container)",
        highlight: "var(--color-highlight)",
        text: "var(--color-text)",
      },
    },
  },
  plugins: [],
};
