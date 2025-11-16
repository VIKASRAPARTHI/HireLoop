/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hireloop-gradient': "linear-gradient(to right, rgb(0, 59, 102), rgb(6, 46, 96))",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        hireloop: {
          "primary": "#3B82F6",      // Vibrant Blue (from logo - Loop color)
          "secondary": "#60A5FA",    // Lighter Blue (from logo - Hire color)
          "base-100": "#FFFFFF",     // White background
          "base-200": "#F9FAFB",     // Light Gray background
          "base-300": "#F3F4F6",     // Lighter Gray background
          "base-content": "#000000", // Black text
        },
      },
    ],
  },
};

