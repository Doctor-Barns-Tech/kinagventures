/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{app,components,libs,pages,hooks}/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Purple + white brand — KINAG VENTURES
        primary: {
          DEFAULT: '#7C3AED',   // main purple
          soft: '#F5F3FF',      // soft purple-tinted background
          light: '#C4B5FD',     // lighter purple for subtle accents
          dark: '#5B21B6',      // deep purple for footer, hover, CTAs
        },
        accent: {
          DEFAULT: '#8B5CF6',   // accent purple (buttons, links)
          muted: '#DDD6FE',     // chips, badges, soft borders
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#FAFAFA',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        handwriting: ['Pacifico', 'cursive'],
      },
    },
  },
  plugins: [],
}

