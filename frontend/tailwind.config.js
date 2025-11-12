/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        hireloop: {
          // Primary: shades of black (used for strong CTAs / dark backgrounds)
          "primary": "#0B1220",           // almost-black primary
          "primary-focus": "#0f1724",     // slightly lighter for focus/hover
          "primary-content": "#FFFFFF",    // text on primary

          // Secondary: shades of blue (brand accent)
          "secondary": "#1E40AF",         // indigo-800 / deeper blue
          "secondary-focus": "#1E3A8A",   // darker on focus
          "secondary-content": "#FFFFFF",

          // Tertiary: light blue (subtle gradient stop / highlights)
          "tertiary": "#60A5FA",          // light blue
          "tertiary-content": "#000000",

          "base-100": "#FFFFFF",     // White background
          "base-200": "#F9FAFB",     // Light Gray background
          "base-300": "#F3F4F6",     // Lighter Gray background
          "base-content": "#000000", // Black text
        },
      },
    ],
  },
};

