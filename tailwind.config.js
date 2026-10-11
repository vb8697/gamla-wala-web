/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: '#1B5E3B',
          sage: '#6BAF7B',
          cream: '#F8F6EE',
          terracotta: '#D98B5A',
          dark: '#0F3D28',
        },
        forest: {
          950: '#082316',
          900: '#0F3D28', // Dark Green
          800: '#1B5E3B', // Forest Green
          700: '#23734a',
          600: '#2d8c5b',
        },
        sage: {
          500: '#6BAF7B', // Sage Green
          400: '#84c192',
          300: '#a3d4ae',
          200: '#c5e6cc',
          100: '#e3f4e8',
          50: '#f2faf4',
        },
        cream: {
          50: '#F8F6EE', // Official Cream
          100: '#f3efdf',
          200: '#ebe4ce',
          300: '#ded3b6',
        },
        terracotta: {
          700: '#aa5d2f',
          600: '#c2703f',
          500: '#D98B5A', // Official Terracotta
          400: '#e29e74',
          100: '#f8e6dc',
          50: '#fdf7f3',
        },
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
