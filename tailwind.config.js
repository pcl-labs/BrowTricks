// Default config https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

const boxShadow = require('./src/assets/styles/shadows');
const colors = require('./src/assets/styles/colors');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: ['./public/**/*.html', './src/**/*.vue', './src/**/*.js'],
  theme: {
    extend: {
      boxShadow,
      colors,
      opacity: {
        high: '1',
        medium: '0.54',
        disabled: '0.38',
        divider: '0.12'
      },
      borderRadius: {
        sm: '0.1875rem',
        md: '0.375rem',
        xl: '0.75rem',
        '2xl': '1.25rem'
      },
      borderWidth: {
        '6': '6px'
      },
      screens: {
        xl: '1280px',
        xxl: '1920px'
      },
      spacing: {
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '14': '3.5rem',
        '128': '32rem',
        '160': '40rem'
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans]
      },
      inset: {
        '1/2': '50%'
      },
      zIndex: {
        '-1': '-1',
        '100': '100',
        '110': '110'
      },
      wordBreak: {
        'break-word': 'break-word'
      },
      backgroundImage: {
        'phones-image':
          'url(https://res.cloudinary.com/whynotearth/image/upload/v1618759425/BrowTricks/Phones_Full_Width_qedj14.png)',
        // Need path to be relative to the app.css where tailwind is located
        spots: 'url(../patterns/spots.png)',
        patch: 'url(../patterns/patch.png)'
      }
    }
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.safe-top-padding': {
          paddingTop: 'constant(safe-area-inset-top)',
          paddingTop: 'env(safe-area-inset-top)'
        },
        '.safe-left-padding': {
          paddingLeft: 'constant(safe-area-inset-left)',
          paddingLeft: 'env(safe-area-inset-left)'
        },
        '.safe-right-padding': {
          paddingRight: 'constant(safe-area-inset-right)',
          paddingRight: 'env(safe-area-inset-right)'
        },
        '.safe-bottom-padding': {
          paddingBottom: 'constant(safe-area-inset-bottom)',
          paddingBottom: 'env(safe-area-inset-bottom)'
        },
        '.no-tap-highlighting': {
          'webkit-tap-highlight-color': 'rgba(0,0,0,0)'
        },
        '.top-safe': {
          top: 'constant(safe-area-inset-top)',
          top: 'env(safe-area-inset-top)'
        }
      };

      addUtilities(newUtilities);
    })
  ]
};
