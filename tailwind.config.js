/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
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
          neutral: '#FFC107',
          negative: '#F44336',
        },
        priority: {
          high: '#F44336',
          medium: '#FF9800',
          low: '#2196F3',
        },
      },
    },
  },
  plugins: [],
};
