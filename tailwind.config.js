/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Modo Claro - JC Pastelaria
        primary: {
          50: '#FFFBF0',
          100: '#FFF4D6',
          200: '#FFE8AD',
          300: '#FFDC84',
          400: '#FFD05B',
          500: '#FFC700', // Amarelo principal
          600: '#E6B300',
          700: '#CC9F00',
          800: '#B38B00',
          900: '#997700',
        },
        secondary: {
          50: '#FFF8F0',
          100: '#FFEDD6',
          200: '#FFDAAD',
          300: '#FFC784',
          400: '#FFB55B',
          500: '#FFB300', // Amarelo gradiente
          600: '#E6A100',
          700: '#CC8F00',
          800: '#B37D00',
          900: '#996B00',
        },
        accent: {
          50: '#F5F0E8',
          100: '#E8D6C2',
          200: '#DBBC9C',
          300: '#CEA276',
          400: '#C18850',
          500: '#753700', // Laranja-escuro
          600: '#693200',
          700: '#5D2D00',
          800: '#512800',
          900: '#452300',
        },
        brown: {
          50: '#F2E8E0',
          100: '#E0C4B0',
          200: '#CEA080',
          300: '#BC7C50',
          400: '#AA5820',
          500: '#4D1F00', // Marrom subtítulos
          600: '#441C00',
          700: '#3B1900',
          800: '#321600',
          900: '#291300',
        },
        card: {
          50: '#FEFCFA',
          100: '#FEF8F4',
          200: '#FDF4EE',
          300: '#FDF0E8',
          400: '#FDECE2', // Bege claro
          500: '#FCE8DC',
          600: '#E3D1C6',
          700: '#CABAB0',
          800: '#B1A39A',
          900: '#988C84',
        },
        success: {
          50: '#F0F9F4',
          100: '#DCF4E6',
          200: '#BBE9CD',
          300: '#86DFAB',
          400: '#4ACD82',
          500: '#28A745', // Verde botões
          600: '#1F8A3A',
          700: '#1A6D2F',
          800: '#175724',
          900: '#14471D',
        },
        danger: {
          50: '#FDF2F2',
          100: '#FCE8E8',
          200: '#F8D7D7',
          300: '#F2B8B8',
          400: '#EA8A8A',
          500: '#DC3545', // Vermelho alertas
          600: '#C82333',
          700: '#A71E2A',
          800: '#881A21',
          900: '#6F171C',
        },
        // Modo Noturno
        dark: {
          bg: '#1A1A1A',
          card: '#2D2D2D',
          text: '#FFFFFF',
          'text-secondary': '#B3B3B3',
          yellow: '#FFD700',
          accent: '#4A90E2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 199, 0, 0.3)',
        'glow-lg': '0 0 40px rgba(255, 199, 0, 0.4)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};