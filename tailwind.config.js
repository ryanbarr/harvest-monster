/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,svelte,css,js}"],
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
