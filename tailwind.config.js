/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tahoma', 'MS Sans Serif', 'Arial', 'sans-serif'],
      },
      colors: {
        /* Win2k system palette */
        win: {
          silver:    '#d4d0c8',
          white:     '#ffffff',
          darkgray:  '#808080',
          black:     '#000000',
          darkest:   '#404040',
          teal:      '#008080',
          titleFrom: '#0a246a',
          titleTo:   '#a6caf0',
          blue:      '#0a246a',
          tooltip:   '#ffffe1',
          inset:     '#ffffff',
        },
        rb: {
          yellow: '#FFED00',
          black: '#000000',
        },
        segment: {
          standard: '#4CAF50',
          affluent: '#FFB300',
          premium: '#212121',
        },
        sentiment: {
          positive: '#4CAF50',
          neutral:  '#FFC107',
          negative: '#F44336',
        },
        priority: {
          high:   '#F44336',
          medium: '#FF9800',
          low:    '#2196F3',
        },
      },
    },
  },
  plugins: [],
};
