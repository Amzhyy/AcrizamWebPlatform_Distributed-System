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
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Electric Blue base
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        accent: {
          violet: '#8b5cf6', // Soft violet
          cyan: '#06b6d4', // Cyan glow
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
        'glow-cyan': '0 0 20px -5px rgba(6, 182, 212, 0.4)',
        'glow-violet': '0 0 20px -5px rgba(139, 92, 246, 0.4)',
        'glow-primary': '0 0 20px -5px rgba(59, 130, 246, 0.4)',
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
