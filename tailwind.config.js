module.exports = {
  content: [
    "./**/*.{html,js}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      body: ["'Inter'", "system-ui", "-apple-system", "'Segoe UI'", "sans-serif"],
      heading: ["'Poppins'", "system-ui", "-apple-system", "'Segoe UI'", "sans-serif"],
    },
    extend: {
      colors: {
        // nueva paleta de colores 
        primary: {
          50: '#f0f5f7',
          100: '#f4fbfd',
          200: '#a8c9d1',
          300: '#7caeba',
          400: '#5c8374',
          500: '#3d6b65',
          600: '#2d5450',
          700: '#1d3d3a',
          800: '#1B4242',
          900: '#092635',
        },
        secondary: {
          50: '#f5f7f6',
          100: '#e8efed',
          200: '#d1dfdb',
          300: '#bacfc5',
          400: '#9ec8b9',
          500: '#7db3a0',
          600: '#5c9987',
          700: '#3d7f6e',
          800: '#2a6555',
          900: '#1d483c',
        },
        accent: {
          50: '#f3f6f5',
          100: '#dceae6',
          200: '#b8d3cc',
          300: '#94bcb3',
          400: '#5c8374',
          500: '#3d6b5a',
          600: '#2d5348',
          700: '#1d3b36',
          800: '#1B4242',
          900: '#092635',
        },
      },
      spacing: {
        'section': '5rem',
      },
      borderRadius: {
        'xl': '18px',
      },
      boxShadow: {
        'soft': '0 12px 32px rgba(0, 0, 0, 0.08)',
        'soft-dark': '0 12px 32px rgba(0, 0, 0, 0.5)',
      },
      transitionDuration: {
        'fast': '180ms',
      },
      backgroundImage: {
        'gradient-subtle': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 111, 97, 0)' },
          '50%': { boxShadow: '0 0 0 12px rgba(255, 111, 97, 0.12)' },
        },
        'eq-pulse': {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1)' },
        },
        'caret-blink': {
          '0%, 49%': { opacity: '0.9' },
          '50%, 100%': { opacity: '0.1' },
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'eq-pulse-1': 'eq-pulse 600ms ease-in-out infinite',
        'eq-pulse-2': 'eq-pulse 700ms ease-in-out infinite',
        'eq-pulse-3': 'eq-pulse 800ms ease-in-out infinite',
        'caret-blink': 'caret-blink 1s steps(2, jump-none) infinite',
      },
    },
  },
  plugins: [],
}
