/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05070C',
          900: '#080B14',
          800: '#0C111D',
          700: '#111726',
          600: '#171F32',
          border: 'rgba(232,236,244,0.08)',
          borderStrong: 'rgba(232,236,244,0.14)'
        },
        paper: {
          100: '#EEF1F8',
          300: '#C7CEDE',
          500: '#8B93A7',
          700: '#5B6376'
        },
        signal: {
          blue: '#3E7BFA',
          blueSoft: '#7FA5FF',
          orange: '#FF7A45',
          orangeSoft: '#FFAB7A'
        }
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(232,236,244,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(232,236,244,0.045) 1px, transparent 1px)',
        'glow-blue': 'radial-gradient(circle, rgba(62,123,250,0.35) 0%, rgba(62,123,250,0) 70%)',
        'glow-orange': 'radial-gradient(circle, rgba(255,122,69,0.28) 0%, rgba(255,122,69,0) 70%)'
      },
      boxShadow: {
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.6)',
        glowBlue: '0 0 0 1px rgba(62,123,250,0.4), 0 8px 30px -8px rgba(62,123,250,0.45)',
        glowOrange: '0 0 0 1px rgba(255,122,69,0.4), 0 8px 30px -8px rgba(255,122,69,0.45)'
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        blink: 'blink 1.1s step-end infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' }
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 }
        }
      }
    }
  },
  plugins: []
}
