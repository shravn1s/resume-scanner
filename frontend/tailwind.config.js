import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
        outfit: ['Outfit', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        grayBg: '#f5f5f5',
        dark: '#2b2b2b',
      },
    },
  },
  plugins: [require('daisyui')],
};
