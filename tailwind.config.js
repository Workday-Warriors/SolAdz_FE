/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #C669FF 0%, #2029FF 55%, #39A0FF 100%)',
        'button-gradient': 'linear-gradient(to right, #2029FF, #39A0FF)', // Define the gradient for the border
      },
    },
  },
  plugins: [],
}