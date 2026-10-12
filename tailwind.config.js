/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07090E', // Deepest background
          900: '#0B0F19', // Main panel background
          850: '#0E1422', // Card background
          800: '#141C30', // Elevated card / modal
          700: '#1F2A44', // Active item / border
          600: '#2E3D60', // Border subtle
        },
        brand: {
          purple: '#8B5CF6',
          violet: '#A855F7',
          coral: '#F43F5E',
          yellow: '#FBBF24',
          emerald: '#10B981',
          cyan: '#06B6D4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.3)',
        'glow-coral': '0 0 25px -5px rgba(244, 63, 94, 0.25)',
        'glow-card': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'fintech-mesh': 'radial-gradient(at 10% 20%, rgba(139, 92, 246, 0.08) 0px, transparent 50%), radial-gradient(at 90% 80%, rgba(244, 63, 94, 0.06) 0px, transparent 50%)',
      }
    },
  },
  plugins: [],
}
