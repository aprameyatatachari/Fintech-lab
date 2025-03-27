import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0A0E17',
          black: '#000000',
          blue: '#0F172A',
          purple: '#1E0B3C',
        },
        gold: {
          light: '#F8D57E',
          DEFAULT: '#E5B22B',
          dark: '#C99D10',
        },
        star: {
          white: '#FFFFFF',
          blue: '#A9CCEC',
          purple: '#D6C4FF',
        }
      },
      fontFamily: {
        'sans': ['Montserrat', 'system-ui', 'sans-serif'],
        'display': ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'shooting-star': 'shooting 3s linear infinite',
        'twinkling': 'twinkle 4s ease-in-out infinite',
      },
      keyframes: {
        shooting: {
          '0%': { transform: 'translateX(0) translateY(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { transform: 'translateX(300px) translateY(300px)', opacity: '0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
