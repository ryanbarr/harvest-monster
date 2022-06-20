/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./packages/renderer/**/*.svelte"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        container: "var(--color-container)",
        highlight: "var(--color-highlight)",
        text: "var(--color-text)"
      }
    },
  },
  plugins: [],
}
