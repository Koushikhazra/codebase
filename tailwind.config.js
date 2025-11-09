/** @type {import('tailwindcss').Config} */
export default {
  // Use the "class" strategy so adding/removing the `dark` class on <html>
  // controls dark mode. Previously Tailwind defaulted to 'media' which
  // reads the system preference and ignores the `dark` class.
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
