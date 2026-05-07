/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444', // Red base
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        accent: {
          violet: '#b91c1c', // Medium red
          cyan: '#0f172a', // Slate 900 (almost black)
        },
        background: '#ffffff',
        surface: '#f8fafc', // slate-50
        surfaceAlt: '#f1f5f9', // slate-100
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -5px rgba(220, 38, 38, 0.4)',
        'glow-violet': '0 0 20px -5px rgba(153, 27, 27, 0.4)',
        'glow-primary': '0 0 20px -5px rgba(239, 68, 68, 0.4)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 100%)',
      },
    },
  },
  plugins: [],
}
